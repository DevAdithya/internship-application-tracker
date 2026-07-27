import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Button — Premium design system button
 * Inspired by Linear, Stripe, Vercel aesthetics
 *
 * @param {string} variant   - 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'link'
 * @param {string} size      - 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} loading  - shows spinner, disables button
 * @param {boolean} disabled
 * @param {ReactNode} leftIcon   - icon on the left
 * @param {ReactNode} rightIcon  - icon on the right
 * @param {boolean} iconOnly - square button with just an icon
 * @param {boolean} fullWidth
 */

const variantClasses = {
  primary: [
    'bg-indigo-600 text-white border border-indigo-600',
    'hover:bg-indigo-500 hover:border-indigo-500',
    'active:bg-indigo-700 active:border-indigo-700',
    'focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-1',
    'shadow-[0_1px_3px_rgba(99,102,241,0.3)] hover:shadow-[0_2px_8px_rgba(99,102,241,0.4)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:hover:border-indigo-600 disabled:hover:shadow-none',
  ],
  secondary: [
    'bg-white/[0.06] text-[var(--text-main)] border border-white/10',
    'hover:bg-white/[0.1] hover:border-white/20',
    'active:bg-white/[0.04]',
    'focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1',
    '[data-theme="light"_&]:bg-neutral-100 [data-theme="light"_&]:border-neutral-200 [data-theme="light"_&]:hover:bg-neutral-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  ghost: [
    'bg-transparent text-[var(--text-muted)] border border-transparent',
    'hover:bg-white/[0.06] hover:text-[var(--text-main)] hover:border-white/10',
    'active:bg-white/[0.04]',
    'focus-visible:ring-2 focus-visible:ring-white/20',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ],
  danger: [
    'bg-rose-600 text-white border border-rose-600',
    'hover:bg-rose-500 hover:border-rose-500',
    'active:bg-rose-700',
    'focus-visible:ring-2 focus-visible:ring-rose-500/50 focus-visible:ring-offset-1',
    'shadow-[0_1px_3px_rgba(244,63,94,0.25)] hover:shadow-[0_2px_8px_rgba(244,63,94,0.35)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  outline: [
    'bg-transparent text-[var(--text-main)] border border-[var(--border-color)]',
    'hover:border-indigo-500/60 hover:text-indigo-400',
    'active:bg-indigo-500/5',
    'focus-visible:ring-2 focus-visible:ring-indigo-500/40',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  link: [
    'bg-transparent text-indigo-400 border border-transparent p-0 h-auto',
    'hover:text-indigo-300 hover:underline underline-offset-4',
    'focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded-sm',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  success: [
    'bg-emerald-600 text-white border border-emerald-600',
    'hover:bg-emerald-500',
    'active:bg-emerald-700',
    'focus-visible:ring-2 focus-visible:ring-emerald-500/50',
    'shadow-[0_1px_3px_rgba(16,185,129,0.25)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
};

const sizeClasses = {
  xs: 'h-7 px-2.5 text-[0.72rem] gap-1 rounded-md',
  sm: 'h-8 px-3 text-[0.8125rem] gap-1.5 rounded-[7px]',
  md: 'h-9 px-3.5 text-sm gap-2 rounded-lg',
  lg: 'h-10 px-4 text-[0.9375rem] gap-2 rounded-lg',
  xl: 'h-12 px-5 text-base gap-2.5 rounded-xl',
};

const iconOnlySizeClasses = {
  xs: 'h-7 w-7 rounded-md',
  sm: 'h-8 w-8 rounded-[7px]',
  md: 'h-9 w-9 rounded-lg',
  lg: 'h-10 w-10 rounded-lg',
  xl: 'h-12 w-12 rounded-xl',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  fullWidth = false,
  className,
  children,
  as: Tag = 'button',
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <Tag
      disabled={isDisabled}
      className={cn(
        // Base
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-150 ease-out',
        'select-none whitespace-nowrap',
        'focus:outline-none focus-visible:outline-none',
        'cursor-pointer',

        // Variant
        variantClasses[variant],

        // Size
        iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],

        // Full width
        fullWidth && 'w-full',

        // Loading shimmer
        loading && 'relative overflow-hidden',

        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size={size} />
          {children && <span className="ml-1.5 opacity-70">{children}</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
        </>
      )}
    </Tag>
  );
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner({ size }) {
  const dim = { xs: 12, sm: 14, md: 15, lg: 16, xl: 18 }[size] ?? 15;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin shrink-0"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="30 70"
        className="opacity-30"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── ButtonGroup ─────────────────────────────────────────────────────────────

export function ButtonGroup({ children, className }) {
  return (
    <div className={cn('inline-flex items-center', className)}>
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        const isFirst = i === 0;
        const isLast = i === React.Children.count(children) - 1;
        return React.cloneElement(child, {
          className: cn(
            child.props.className,
            !isFirst && '-ml-px',
            isFirst && '!rounded-r-none',
            isLast && '!rounded-l-none',
            !isFirst && !isLast && '!rounded-none',
          ),
        });
      })}
    </div>
  );
}

export default Button;
