import { ReactNode } from 'react';

type CardVariant = 'default' | 'quest' | 'reward' | 'danger';

interface CardProps {
  variant?: CardVariant;
  title?: string;
  subtitle?: string;
  icon?: string;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[var(--parchment-dark)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)]',
  quest:   'bg-[var(--parchment-dark)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(245,158,11,0.15)]',
  reward:  'bg-[var(--forest)] text-[#0c0c10] shadow-lg shadow-emerald-500/25',
  danger:  'bg-[var(--danger)] text-white shadow-lg shadow-red-500/25',
};

export default function Card({ variant = 'default', title, subtitle, icon, footer, children, className = '' }: CardProps) {
  return (
    <div className={`rounded-3xl p-5 ${variantStyles[variant]} ${className}`}>
      {(icon || title || subtitle) && (
        <div className="mb-3">
          {icon && <div className="text-3xl mb-1 float">{icon}</div>}
          {title && <h3 className="font-bold text-lg leading-tight">{title}</h3>}
          {subtitle && <p className="text-sm opacity-70 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
      {footer && (
        <div className="mt-4 pt-3 border-t border-current/20">
          {footer}
        </div>
      )}
    </div>
  );
}
