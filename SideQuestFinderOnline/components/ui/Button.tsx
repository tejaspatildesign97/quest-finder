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

// DESIGN-figma.md: the primary action is always the black pill; the secondary
// is the white pill. Colored buttons are gone from the system.
const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[var(--fg-ink)] text-white active:scale-[0.97]',
  secondary:
    'bg-[var(--fg-canvas)] text-[var(--fg-ink)] border border-[var(--fg-hairline)] active:scale-[0.97]',
  danger:
    'bg-[var(--danger)] text-white active:scale-[0.97]',
  ghost:
    'bg-[var(--fg-surface-soft)] text-[var(--fg-ink)] hover:bg-[var(--fg-hairline-soft)] active:scale-[0.97]',
  magic:
    'bg-[var(--fg-ink)] text-white active:scale-[0.97]',
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
        inline-flex items-center justify-center gap-2 font-medium tracking-tight
        rounded-full transition-all duration-150 cursor-pointer
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
