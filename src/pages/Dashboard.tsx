import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, LogOut, Plus, MessageSquare, Loader2, AlertTriangle, Scale, Users, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/lib/auth-context';
import { ROLE_INFO, ROLE_SYSTEM_PROMPTS, UserRole } from '@/lib/role-context';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

const ROLE_ICONS = {
  lawyer: Scale,
  citizen: Users,
  student: GraduationCap,
};

export default function Dashboard() {
  const { profile, signOut } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const role = (profile?.role || 'citizen') as UserRole;
  const roleInfo = ROLE_INFO[role];
  const RoleIcon = ROLE_ICONS[role];

  useEffect(() => {
    loadConversations();
  }, [profile]);

  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation);
    }
  }, [currentConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    if (!profile) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from('conversations')
      .select('id, title, created_at')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
    } else {
      setConversations(data || []);
      if (data && data.length > 0 && !currentConversation) {
        setCurrentConversation(data[0].id);
      }
    }
    setIsLoading(false);
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  const createNewConversation = async () => {
    if (!profile) return;

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: profile.id,
        title: 'New Conversation',
        role_context: role,
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to create conversation');
      console.error(error);
    } else {
      setConversations([data, ...conversations]);
      setCurrentConversation(data.id);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentConversation || !profile || isSending) return;

    const userMessage = input.trim();
    setInput('');
    setIsSending(true);

    // Optimistically add user message
    const tempUserMsg: Message = {
      id: 'temp-user',
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      // Save user message
      const { data: savedUserMsg, error: userMsgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: currentConversation,
          user_id: profile.id,
          role: 'user',
          content: userMessage,
        })
        .select()
        .single();

      if (userMsgError) throw userMsgError;

      // Update with real message
      setMessages((prev) => prev.map((m) => (m.id === 'temp-user' ? savedUserMsg : m)));

      // Call AI
      const allMessages = [...messages.filter(m => m.id !== 'temp-user'), savedUserMsg];
      const response = await supabase.functions.invoke('chat', {
        body: {
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
          systemPrompt: ROLE_SYSTEM_PROMPTS[role],
        },
      });

      if (response.error) throw response.error;

      const aiContent = response.data?.content || 'I apologize, but I was unable to generate a response.';

      // Save AI message
      const { data: savedAiMsg, error: aiMsgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: currentConversation,
          user_id: profile.id,
          role: 'assistant',
          content: aiContent,
        })
        .select()
        .single();

      if (aiMsgError) throw aiMsgError;

      setMessages((prev) => [...prev, savedAiMsg]);

      // Update conversation title if first message
      if (messages.length === 0) {
        const title = userMessage.slice(0, 50) + (userMessage.length > 50 ? '...' : '');
        await supabase
          .from('conversations')
          .update({ title })
          .eq('id', currentConversation);
        setConversations((prev) =>
          prev.map((c) => (c.id === currentConversation ? { ...c, title } : c))
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
      setMessages((prev) => prev.filter((m) => m.id !== 'temp-user'));
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <Logo size="sm" />
        </div>

        <div className="p-3">
          <Button variant="gold" className="w-full" onClick={createNewConversation}>
            <Plus size={18} />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setCurrentConversation(conv.id)}
              className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                currentConversation === conv.id
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageSquare size={16} />
              <span className="truncate text-sm">{conv.title}</span>
            </button>
          ))}
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${role}/20`}>
              <RoleIcon size={20} className={`text-${role}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile?.email}</p>
              <p className={`text-xs text-${role}`}>{roleInfo.title}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full" onClick={signOut}>
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-${role}/20 mb-4`}>
                    <RoleIcon size={32} className={`text-${role}`} />
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-2">
                    Welcome, {roleInfo.title}
                  </h2>
                  <p className="text-muted-foreground max-w-md mb-6">
                    {roleInfo.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-lg">
                    {roleInfo.features.map((feature, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary border border-border'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-secondary border border-border p-4 rounded-2xl flex items-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    <span className="text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="max-w-4xl mx-auto flex gap-3">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask a legal question as a ${role}...`}
                  className="min-h-[56px] max-h-32 resize-none"
                  disabled={isSending}
                />
                <Button
                  variant="gold"
                  size="icon"
                  className="h-14 w-14"
                  onClick={sendMessage}
                  disabled={!input.trim() || isSending}
                >
                  {isSending ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                <AlertTriangle size={12} />
                AI responses are for guidance only. Consult a licensed lawyer for legal advice.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold mb-2">No Conversation Selected</h2>
              <p className="text-muted-foreground mb-4">Create a new chat to get started</p>
              <Button variant="gold" onClick={createNewConversation}>
                <Plus size={18} />
                New Chat
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
