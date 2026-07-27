import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Input — Premium text input with label, icon, error, hint, success states
 */

const inputBaseClasses = [
  'w-full bg-white/[0.04] text-[var(--text-main)]',
  'border border-[var(--border-color)]',
  'rounded-lg',
  'placeholder:text-[var(--text-subtle)]',
  'transition-all duration-150',
  'focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06]',
  'focus:ring-1 focus:ring-indigo-500/30',
  'hover:border-white/20',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/[0.02]',
].join(' ');

const inputSizeClasses = {
  sm:  'h-8  px-2.5 text-[0.8125rem]',
  md:  'h-9  px-3   text-sm',
  lg:  'h-10 px-3.5 text-[0.9375rem]',
  xl:  'h-12 px-4   text-base',
};

export const Input = forwardRef(function Input(
  {
    label,
    hint,
    error,
    success,
    size = 'md',
    leftIcon,
    rightIcon,
    type = 'text',
    fullWidth = true,
    required,
    optional,
    className,
    id,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
  const isPassword = type === 'password';
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {/* Label Row */}
      {label && (
        <label
          htmlFor={inputId}
          className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--text-main)]"
        >
          {label}
          {required && <span className="text-rose-400 text-xs leading-none">*</span>}
          {optional && (
            <span className="text-[var(--text-subtle)] text-xs font-normal">(optional)</span>
          )}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative flex items-center">
        {/* Left Icon */}
        {leftIcon && (
          <span className="absolute left-3 flex items-center text-[var(--text-subtle)] pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          className={cn(
            inputBaseClasses,
            inputSizeClasses[size],
            leftIcon && 'pl-9',
            (rightIcon || isPassword) && 'pr-9',
            error && [
              'border-rose-500/70 focus:border-rose-500',
              'focus:ring-rose-500/25',
              'bg-rose-500/5',
            ],
            success && [
              'border-emerald-500/60 focus:border-emerald-500',
              'focus:ring-emerald-500/25',
            ],
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />

        {/* Right: password toggle OR custom icon */}
        <span className="absolute right-3 flex items-center">
          {isPassword ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          ) : error ? (
            <AlertCircle size={15} className="text-rose-400 pointer-events-none" />
          ) : success ? (
            <CheckCircle2 size={15} className="text-emerald-400 pointer-events-none" />
          ) : rightIcon ? (
            <span className="text-[var(--text-subtle)] pointer-events-none">{rightIcon}</span>
          ) : null}
        </span>
      </div>

      {/* Error / Hint */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-xs text-rose-400 flex items-center gap-1"
          role="alert"
        >
          <AlertCircle size={11} className="shrink-0" />
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-xs text-[var(--text-subtle)]">
          {hint}
        </p>
      )}
    </div>
  );
});

// ─── Textarea ─────────────────────────────────────────────────────────────────

export const Textarea = forwardRef(function Textarea(
  { label, hint, error, rows = 4, required, optional, id, fullWidth = true, className, ...props },
  ref
) {
  const inputId = id || `textarea-${Math.random().toString(36).slice(2)}`;

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={inputId}
          className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--text-main)]"
        >
          {label}
          {required && <span className="text-rose-400 text-xs">*</span>}
          {optional && (
            <span className="text-[var(--text-subtle)] text-xs font-normal">(optional)</span>
          )}
        </label>
      )}

      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={cn(
          inputBaseClasses,
          'py-2.5 px-3 resize-none text-sm leading-relaxed',
          'min-h-[80px]',
          error && 'border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/25 bg-rose-500/5',
          className
        )}
        aria-invalid={!!error}
        {...props}
      />

      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1" role="alert">
          <AlertCircle size={11} className="shrink-0" />
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="text-xs text-[var(--text-subtle)]">{hint}</p>
      )}
    </div>
  );
});

// ─── Select ───────────────────────────────────────────────────────────────────

export const Select = forwardRef(function Select(
  { label, hint, error, size = 'md', required, optional, id, fullWidth = true, className, children, ...props },
  ref
) {
  const inputId = id || `select-${Math.random().toString(36).slice(2)}`;

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={inputId}
          className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--text-main)]"
        >
          {label}
          {required && <span className="text-rose-400 text-xs">*</span>}
          {optional && (
            <span className="text-[var(--text-subtle)] text-xs font-normal">(optional)</span>
          )}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={cn(
            inputBaseClasses,
            inputSizeClasses[size],
            'pr-8 appearance-none cursor-pointer',
            error && 'border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/25 bg-rose-500/5',
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {children}
        </select>
        {/* Chevron */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-subtle)]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1" role="alert">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-[var(--text-subtle)]">{hint}</p>}
    </div>
  );
});

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export const Checkbox = forwardRef(function Checkbox(
  { label, hint, error, id, size = 'md', className, ...props },
  ref
) {
  const inputId = id || `checkbox-${Math.random().toString(36).slice(2)}`;
  const dimClass = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' }[size];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="flex items-center gap-2.5 cursor-pointer group">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={cn(
            dimClass,
            'rounded border border-[var(--border-color)] bg-white/[0.04]',
            'text-indigo-500 accent-indigo-500',
            'focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-0',
            'cursor-pointer transition-all duration-150',
            'checked:border-indigo-500',
            className
          )}
          {...props}
        />
        {label && (
          <span className="text-sm text-[var(--text-main)] group-hover:text-[var(--text-main)] select-none">
            {label}
          </span>
        )}
      </label>
      {error && <p className="text-xs text-rose-400 ml-6">{error}</p>}
      {!error && hint && <p className="text-xs text-[var(--text-subtle)] ml-6">{hint}</p>}
    </div>
  );
});

// ─── FormField Wrapper ─────────────────────────────────────────────────────────

export function FormField({ label, hint, error, required, optional, children, className }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--text-main)]">
          {label}
          {required && <span className="text-rose-400 text-xs">*</span>}
          {optional && <span className="text-[var(--text-subtle)] text-xs font-normal">(optional)</span>}
        </span>
      )}
      {children}
      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1" role="alert">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-[var(--text-subtle)]">{hint}</p>}
    </div>
  );
}
