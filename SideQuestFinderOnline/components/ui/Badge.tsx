import { ReactNode } from 'react';

type BadgeVariant = 'gold' | 'forest' | 'danger' | 'stone' | 'magic';

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold:   'bg-[var(--pastel-orange)] text-amber-300',
  forest: 'bg-[var(--pastel-mint)] text-emerald-300',
  danger: 'bg-rose-400/15 text-rose-300',
  stone:  'bg-[var(--ink)]/8 text-[var(--stone)]',
  magic:  'bg-[var(--pastel-purple)] text-violet-300',
};

export default function Badge({ variant = 'gold', icon, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-1
        text-xs font-bold tracking-wide
        rounded-full
        ${variantStyles[variant]} ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
