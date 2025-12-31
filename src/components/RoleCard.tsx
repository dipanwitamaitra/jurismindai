import { motion } from 'framer-motion';
import { Scale, Users, GraduationCap, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole, ROLE_INFO } from '@/lib/role-context';

const ICONS = {
  Scale,
  Users,
  GraduationCap,
};

interface RoleCardProps {
  role: UserRole;
  onSelect: (role: UserRole) => void;
  isLoading?: boolean;
  loadingRole?: UserRole | null;
}

export function RoleCard({ role, onSelect, isLoading, loadingRole }: RoleCardProps) {
  const info = ROLE_INFO[role];
  const Icon = ICONS[info.icon as keyof typeof ICONS];
  const isThisLoading = loadingRole === role;

  const colorClasses = {
    lawyer: {
      border: 'border-lawyer/30 hover:border-lawyer/60',
      bg: 'bg-lawyer/5 hover:bg-lawyer/10',
      icon: 'text-lawyer',
      glow: 'group-hover:shadow-[0_0_40px_hsl(43_74%_55%_/_0.2)]',
    },
    citizen: {
      border: 'border-citizen/30 hover:border-citizen/60',
      bg: 'bg-citizen/5 hover:bg-citizen/10',
      icon: 'text-citizen',
      glow: 'group-hover:shadow-[0_0_40px_hsl(200_80%_50%_/_0.2)]',
    },
    student: {
      border: 'border-student/30 hover:border-student/60',
      bg: 'bg-student/5 hover:bg-student/10',
      icon: 'text-student',
      glow: 'group-hover:shadow-[0_0_40px_hsl(160_60%_45%_/_0.2)]',
    },
  };

  const colors = colorClasses[role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <button
        onClick={() => onSelect(role)}
        disabled={isLoading}
        className={`
          w-full p-6 rounded-2xl border-2 transition-all duration-300
          ${colors.border} ${colors.bg} ${colors.glow}
          backdrop-blur-sm text-left
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.icon}`}>
            <Icon size={28} strokeWidth={1.5} />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-muted-foreground group-hover:text-foreground transition-colors"
          >
            {isThisLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <ArrowRight size={20} />
            )}
          </motion.div>
        </div>

        <h3 className={`text-xl font-display font-semibold mb-2 ${colors.icon}`}>
          {info.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {info.description}
        </p>

        <ul className="space-y-2">
          {info.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`w-1.5 h-1.5 rounded-full ${colors.icon.replace('text-', 'bg-')}`} />
              {feature}
            </li>
          ))}
        </ul>
      </button>
    </motion.div>
  );
}
