import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Brain, BookOpen, Scale, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced legal reasoning with explainable AI tailored to Bangladesh law',
  },
  {
    icon: Scale,
    title: 'Role-Based Experience',
    description: 'Customized interfaces for lawyers, citizens, and law students',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your legal queries and data are protected with enterprise security',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Coverage',
    description: 'Access to Bangladesh legal codes, case law, and precedents',
  },
];

const stats = [
  { value: '500+', label: 'Legal References' },
  { value: '24/7', label: 'AI Availability' },
  { value: '3', label: 'User Roles' },
  { value: '100%', label: 'Explainable AI' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(43_74%_55%_/_0.08)_0%,transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Navigation */}
        <nav className="relative z-10 w-full py-6 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" size="lg" className="hidden sm:flex">
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="gold" size="lg">
                  Get Started
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
                <Sparkles size={16} />
                AI-Powered Legal Intelligence for Bangladesh
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Navigate Bangladesh Law
              <br />
              <span className="text-gold-gradient">with Confidence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Jurismind brings explainable AI to legal reasoning. Whether you're a lawyer building cases, 
              a citizen seeking rights, or a student learning law — get tailored guidance instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/login">
                <Button variant="gold" size="xl" className="w-full sm:w-auto">
                  Start Free Consultation
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Legal Intelligence, <span className="text-gold-gradient">Reimagined</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jurismind combines deep legal knowledge with cutting-edge AI to deliver 
              personalized, explainable legal guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-card hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(43_74%_55%_/_0.05)_0%,transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Tailored for <span className="text-gold-gradient">Your Role</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different roles need different approaches. Jurismind adapts its AI to 
              provide the most relevant experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Lawyer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="relative p-8 rounded-2xl border-2 border-lawyer/30 bg-lawyer/5 group hover:border-lawyer/60 transition-all"
            >
              <Scale className="text-lawyer mb-4" size={40} />
              <h3 className="font-display text-2xl font-bold text-lawyer mb-3">For Lawyers</h3>
              <p className="text-muted-foreground mb-6">
                Professional legal reasoning with structured arguments, case references, 
                and exportable summaries.
              </p>
              <ul className="space-y-2">
                {['Structured legal reasoning', 'Case law references', 'Export-ready summaries'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-lawyer" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Citizen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-8 rounded-2xl border-2 border-citizen/30 bg-citizen/5 group hover:border-citizen/60 transition-all"
            >
              <Shield className="text-citizen mb-4" size={40} />
              <h3 className="font-display text-2xl font-bold text-citizen mb-3">For Citizens</h3>
              <p className="text-muted-foreground mb-6">
                Clear, jargon-free explanations of your legal rights with actionable 
                next steps.
              </p>
              <ul className="space-y-2">
                {['Simple explanations', 'Rights & duties clarity', 'Document checklists'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-citizen" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Student */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-8 rounded-2xl border-2 border-student/30 bg-student/5 group hover:border-student/60 transition-all"
            >
              <BookOpen className="text-student mb-4" size={40} />
              <h3 className="font-display text-2xl font-bold text-student mb-3">For Students</h3>
              <p className="text-muted-foreground mb-6">
                Educational content with step-by-step explanations and exam-focused 
                guidance.
              </p>
              <ul className="space-y-2">
                {['Concept breakdowns', 'Exam preparation', 'Case study analysis'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-student" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-3xl glass-card border-primary/30"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Legal Work?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of legal professionals, citizens, and students who trust 
              Jurismind for intelligent legal guidance.
            </p>
            <Link to="/login">
              <Button variant="gold" size="xl">
                Get Started Free
                <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Jurismind. AI-powered legal guidance for Bangladesh.
            <br />
            <span className="text-xs">Disclaimer: This is not a substitute for licensed legal advice.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
