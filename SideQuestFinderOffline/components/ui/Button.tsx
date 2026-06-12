'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'magic';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[var(--quest-gold)] text-[#0c0c10] hover:bg-[var(--quest-gold-light)] active:scale-[0.98] shadow-lg shadow-amber-500/30',
  secondary:
    'bg-[var(--forest)] text-[#0c0c10] hover:bg-[var(--forest-light)] active:scale-[0.98] shadow-lg shadow-emerald-500/30',
  danger:
    'bg-[var(--danger)] text-white hover:bg-[var(--danger-light)] active:scale-[0.98] shadow-lg shadow-red-500/30',
  ghost:
    'bg-[var(--ink)]/5 text-[var(--ink)] hover:bg-[var(--ink)]/10 active:scale-[0.98]',
  magic:
    'bg-[var(--magic)] text-white hover:bg-[var(--magic-light)] active:scale-[0.98] shadow-lg shadow-violet-500/30',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-bold tracking-wide
        rounded-2xl transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="text-lg leading-none">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
