'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const baseInput = `
  w-full bg-[var(--surface-2)] text-[var(--ink)]
  border-2 border-[var(--ink)]/10 rounded-2xl
  px-4 py-3 text-base
  placeholder:text-[var(--stone-light)]
  focus:outline-none focus:border-[var(--quest-gold)] focus:ring-4 focus:ring-amber-500/10
  transition-all duration-150
`;

export function Input({ label, hint, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-bold text-[var(--ink)]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--stone)]">
            {icon}
          </span>
        )}
        <input
          className={`${baseInput} ${icon ? 'pl-9' : ''} ${error ? 'border-[var(--danger)]' : ''} ${className}`}
          {...props}
        />
      </div>
      {hint && !error && <p className="text-xs text-[var(--stone)]">{hint}</p>}
      {error && <p className="text-xs text-[var(--danger)] font-bold">⚠ {error}</p>}
    </div>
  );
}

export function Textarea({ label, hint, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-bold text-[var(--ink)]">
          {label}
        </label>
      )}
      <textarea
        rows={4}
        className={`${baseInput} resize-none ${error ? 'border-[var(--danger)]' : ''} ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-[var(--stone)]">{hint}</p>}
      {error && <p className="text-xs text-[var(--danger)] font-bold">⚠ {error}</p>}
    </div>
  );
}
