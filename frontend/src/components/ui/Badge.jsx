import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Badge — Status and label chips
 * Semantic variants + application status variants
 */

const semanticVariants = {
  // Semantic
  default:   'bg-white/[0.06] text-[var(--text-muted)] border-white/10',
  primary:   'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
  success:   'bg-emerald-500/12 text-emerald-400 border-emerald-500/30',
  warning:   'bg-amber-500/12 text-amber-400 border-amber-500/30',
  danger:    'bg-rose-500/12 text-rose-400 border-rose-500/30',
  info:      'bg-blue-500/12 text-blue-400 border-blue-500/30',
  violet:    'bg-violet-500/12 text-violet-400 border-violet-500/30',
  cyan:      'bg-cyan-500/12 text-cyan-400 border-cyan-500/30',

  // Application status (matching existing CSS system)
  wishlist:   'bg-cyan-500/12 text-cyan-400 border-cyan-500/30',
  applied:    'bg-blue-500/12 text-blue-400 border-blue-500/30',
  assessment: 'bg-violet-500/12 text-violet-400 border-violet-500/30',
  interview:  'bg-amber-500/12 text-amber-400 border-amber-500/30',
  offered:    'bg-emerald-500/12 text-emerald-400 border-emerald-500/30',
  rejected:   'bg-rose-500/12 text-rose-400 border-rose-500/30',
};

const dotColorMap = {
  default:    'bg-[var(--text-subtle)]',
  primary:    'bg-indigo-400',
  success:    'bg-emerald-400',
  warning:    'bg-amber-400',
  danger:     'bg-rose-400',
  info:       'bg-blue-400',
  violet:     'bg-violet-400',
  cyan:       'bg-cyan-400',
  wishlist:   'bg-cyan-400',
  applied:    'bg-blue-400',
  assessment: 'bg-violet-400',
  interview:  'bg-amber-400',
  offered:    'bg-emerald-400',
  rejected:   'bg-rose-400',
};

const sizeClasses = {
  xs: 'px-1.5 py-0.5 text-[0.65rem] gap-1 rounded-md',
  sm: 'px-2   py-0.5 text-[0.7rem]  gap-1 rounded-md',
  md: 'px-2.5 py-1   text-[0.75rem] gap-1.5 rounded-lg',
  lg: 'px-3   py-1   text-[0.8rem]  gap-1.5 rounded-lg',
};

/**
 * Convert an application status string to a badge variant key.
 * Handles spaces and case: "Assessment" → "assessment"
 */
export function statusToVariant(status) {
  if (!status) return 'default';
  return status.toLowerCase().replace(/\s+/g, '');
}

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  leftIcon,
  rightIcon,
  className,
  children,
  status, // shorthand: auto-resolves variant from application status string
}) {
  const resolvedVariant = status ? statusToVariant(status) : variant;
  const variantClass = semanticVariants[resolvedVariant] ?? semanticVariants.default;
  const dotColor = dotColorMap[resolvedVariant] ?? dotColorMap.default;

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold border',
        'whitespace-nowrap select-none',
        variantClass,
        sizeClasses[size],
        className
      )}
    >
      {dot && (
        <span className="relative flex items-center justify-center">
          <span className={cn('inline-block rounded-full', dotColor, {
            xs: 'w-1.5 h-1.5',
            sm: 'w-1.5 h-1.5',
            md: 'w-2 h-2',
            lg: 'w-2 h-2',
          }[size])} />
          {pulse && (
            <span className={cn(
              'absolute inline-flex rounded-full animate-ping opacity-60',
              dotColor,
              { xs: 'w-2 h-2', sm: 'w-2 h-2', md: 'w-2.5 h-2.5', lg: 'w-2.5 h-2.5' }[size]
            )} />
          )}
        </span>
      )}
      {leftIcon && <span className="flex items-center shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center shrink-0">{rightIcon}</span>}
    </span>
  );
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────
// Convenience wrapper — auto-resolves variant from an application status string

export function StatusBadge({ status, size = 'md', dot = true, pulse = false, className }) {
  const labels = {
    wishlist:   'Wishlist',
    applied:    'Applied',
    assessment: 'Assessment',
    interview:  'Interviewing',
    offered:    'Offered 🎉',
    rejected:   'Rejected',
  };
  const key = statusToVariant(status);
  return (
    <Badge
      status={status}
      size={size}
      dot={dot}
      pulse={pulse && key === 'interview'}
      className={className}
    >
      {labels[key] ?? status}
    </Badge>
  );
}

// ─── CountBadge ──────────────────────────────────────────────────────────────

export function CountBadge({ count, variant = 'default', size = 'sm', className }) {
  return (
    <Badge variant={variant} size={size} className={cn('min-w-[20px] justify-center', className)}>
      {count}
    </Badge>
  );
}

export default Badge;
