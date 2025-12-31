import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Users, GraduationCap, ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { RoleCard } from '@/components/RoleCard';
import { useAuth } from '@/lib/auth-context';
import { UserRole, DEMO_USERS, ROLE_INFO } from '@/lib/role-context';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  
  const [mode, setMode] = useState<'select' | 'login' | 'signup'>('select');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = async (role: UserRole) => {
    setLoadingRole(role);
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
    setPassword(DEMO_USERS[role].password);
    setError(null);

    // Auto-login with demo credentials
    const { error: signInError } = await signIn(
      DEMO_USERS[role].email,
      DEMO_USERS[role].password
    );

    if (signInError) {
      // If user doesn't exist, create them
      if (signInError.message.includes('Invalid login credentials')) {
        const { error: signUpError } = await signUp(
          DEMO_USERS[role].email,
          DEMO_USERS[role].password,
          role,
          `Demo ${ROLE_INFO[role].title}`
        );

        if (signUpError) {
          setError(signUpError.message);
          toast.error('Failed to create demo account');
          setLoadingRole(null);
          return;
        }

        // Try signing in again
        const { error: retryError } = await signIn(
          DEMO_USERS[role].email,
          DEMO_USERS[role].password
        );

        if (retryError) {
          setError(retryError.message);
          toast.error('Failed to sign in');
          setLoadingRole(null);
          return;
        }
      } else {
        setError(signInError.message);
        toast.error(signInError.message);
        setLoadingRole(null);
        return;
      }
    }

    toast.success(`Welcome, ${ROLE_INFO[role].title}!`);
    navigate('/dashboard');
    setLoadingRole(null);
  };

  const handleManualAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        if (!selectedRole) {
          setError('Please select a role');
          setIsLoading(false);
          return;
        }

        const { error: signUpError } = await signUp(email, password, selectedRole, fullName);
        if (signUpError) {
          setError(signUpError.message);
          toast.error(signUpError.message);
          setIsLoading(false);
          return;
        }

        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          setError(signInError.message);
          toast.error(signInError.message);
          setIsLoading(false);
          return;
        }

        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_74%_55%_/_0.1)_0%,transparent_60%)]" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <Logo size="lg" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 text-center max-w-md"
          >
            <h2 className="font-display text-3xl font-bold mb-4">
              Legal Intelligence,<br />
              <span className="text-gold-gradient">Simplified</span>
            </h2>
            <p className="text-muted-foreground">
              Access AI-powered legal guidance tailored for Bangladesh's legal system. 
              Choose your role and get started instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 flex items-center gap-8"
          >
            <div className="flex items-center gap-2 text-lawyer">
              <Scale size={20} />
              <span className="text-sm">Lawyers</span>
            </div>
            <div className="flex items-center gap-2 text-citizen">
              <Users size={20} />
              <span className="text-sm">Citizens</span>
            </div>
            <div className="flex items-center gap-2 text-student">
              <GraduationCap size={20} />
              <span className="text-sm">Students</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link to="/">
              <Logo size="md" />
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-display text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-muted-foreground mb-8">
                  Select your role to get started with demo credentials
                </p>

                <div className="space-y-4 mb-8">
                  {(['lawyer', 'citizen', 'student'] as UserRole[]).map((role) => (
                    <RoleCard
                      key={role}
                      role={role}
                      onSelect={handleRoleSelect}
                      isLoading={!!loadingRole}
                      loadingRole={loadingRole}
                    />
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground">
                      or use your own account
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setMode('login')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setMode('signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              </motion.div>
            )}

            {(mode === 'login' || mode === 'signup') && (
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setMode('select')}
                  className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2"
                >
                  ← Back to role selection
                </button>

                <h1 className="font-display text-3xl font-bold mb-2">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </h1>
                <p className="text-muted-foreground mb-8">
                  {mode === 'login' 
                    ? 'Enter your credentials to access your account' 
                    : 'Fill in your details to create a new account'}
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive"
                  >
                    <AlertCircle size={20} />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleManualAuth} className="space-y-6">
                  {mode === 'signup' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Select Role</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {(['lawyer', 'citizen', 'student'] as UserRole[]).map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => setSelectedRole(role)}
                              className={`
                                p-3 rounded-lg border-2 transition-all text-center
                                ${selectedRole === role 
                                  ? `border-${role} bg-${role}/10` 
                                  : 'border-border hover:border-muted-foreground'}
                              `}
                            >
                              <span className={`text-sm font-medium ${selectedRole === role ? `text-${role}` : ''}`}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  {mode === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        onClick={() => setMode('signup')}
                        className="text-primary hover:underline"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        onClick={() => setMode('login')}
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 text-xs text-center text-muted-foreground">
            By continuing, you agree to Jurismind's Terms of Service and Privacy Policy.
            <br />
            This AI tool is not a substitute for licensed legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
