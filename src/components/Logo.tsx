import { Scale } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 48,
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/30 rounded-lg blur-lg" />
        <div className="relative p-2 rounded-lg bg-gradient-gold">
          <Scale size={iconSizes[size]} className="text-primary-foreground" strokeWidth={1.5} />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-bold ${textSizes[size]} text-gold-gradient`}>
            Jurismind
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-muted-foreground tracking-wider uppercase">
              AI Legal Assistant
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
