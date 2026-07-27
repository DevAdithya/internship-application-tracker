import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Card — Premium surface component
 * Variants: default, glass, outline, elevated, interactive, flat
 */

const cardVariants = {
  default: [
    'bg-[var(--bg-glass-card)] border border-[var(--border-color)]',
    'shadow-[var(--shadow-sm)]',
  ],
  glass: [
    'bg-[var(--bg-surface)] backdrop-blur-md',
    'border border-[var(--border-color)]',
    'shadow-[var(--shadow-md)]',
  ],
  outline: [
    'bg-transparent border border-[var(--border-color)]',
  ],
  elevated: [
    'bg-[var(--bg-glass-card)] border border-[var(--border-color)]',
    'shadow-[var(--shadow-md)]',
  ],
  flat: [
    'bg-white/[0.03] border border-transparent',
  ],
  interactive: [
    'bg-[var(--bg-glass-card)] border border-[var(--border-color)]',
    'shadow-[var(--shadow-sm)]',
    'cursor-pointer',
    'hover:border-indigo-500/40 hover:-translate-y-0.5',
    'hover:shadow-[0_4px_20px_rgba(0,0,0,0.3),0_0_20px_rgba(99,102,241,0.12)]',
    'active:translate-y-0 active:shadow-[var(--shadow-sm)]',
    'transition-all duration-200',
  ],
};

const cardPaddingMap = {
  none: '',
  xs: 'p-3',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
  xl: 'p-8',
};

const cardRadiusMap = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
};

export function Card({
  variant = 'default',
  padding = 'md',
  radius = 'lg',
  className,
  children,
  as: Tag = 'div',
  ...props
}) {
  return (
    <Tag
      className={cn(
        'overflow-hidden',
        cardVariants[variant],
        cardPaddingMap[padding],
        cardRadiusMap[radius],
        variant !== 'interactive' && 'transition-colors duration-150',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ─── Card Sub-components ─────────────────────────────────────────────────────

export function CardHeader({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3',
        'pb-4 mb-4 border-b border-[var(--border-color)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, as: Tag = 'h3', ...props }) {
  return (
    <Tag
      className={cn(
        'text-base font-semibold text-[var(--text-main)] tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p
      className={cn('text-sm text-[var(--text-muted)] leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 pt-4 mt-4 border-t border-[var(--border-color)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  subtext,
  icon,
  iconColor = 'indigo',
  trend,
  className,
}) {
  const iconColorMap = {
    indigo:  'bg-indigo-500/15 text-indigo-400',
    violet:  'bg-violet-500/15 text-violet-400',
    emerald: 'bg-emerald-500/15 text-emerald-400',
    amber:   'bg-amber-500/15 text-amber-400',
    rose:    'bg-rose-500/15 text-rose-400',
    cyan:    'bg-cyan-500/15 text-cyan-400',
    blue:    'bg-blue-500/15 text-blue-400',
  };

  return (
    <Card variant="glass" className={cn('flex items-start gap-4', className)}>
      {icon && (
        <div
          className={cn(
            'flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center',
            iconColorMap[iconColor] ?? iconColorMap.indigo
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-[var(--text-subtle)] uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-[var(--text-main)] tracking-tight leading-none">
          {value}
        </p>
        {subtext && (
          <p className="text-xs text-[var(--text-muted)] mt-1.5">{subtext}</p>
        )}
        {trend && (
          <p
            className={cn(
              'text-xs font-medium mt-1.5 flex items-center gap-1',
              trend.up ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {trend.up ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </div>
    </Card>
  );
}

export default Card;
