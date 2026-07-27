import React from 'react';
import { Check, X } from 'lucide-react';

export function calculatePasswordStrength(password = '') {
  if (!password) return { score: 0, label: '', color: 'bg-[var(--border-color)]', checks: {} };

  const checks = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let label = 'Weak';
  let color = 'bg-rose-500';
  let textColor = 'text-rose-400';

  if (score === 2) {
    label = 'Fair';
    color = 'bg-amber-500';
    textColor = 'text-amber-400';
  } else if (score === 3) {
    label = 'Good';
    color = 'bg-indigo-500';
    textColor = 'text-indigo-400';
  } else if (score === 4) {
    label = 'Strong';
    color = 'bg-emerald-500';
    textColor = 'text-emerald-400';
  }

  return { score, label, color, textColor, checks };
}

export default function PasswordStrengthMeter({ password = '' }) {
  const { score, label, color, textColor, checks } = calculatePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-2 mt-1.5 animate-in fade-in duration-200">
      {/* Score Header */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-[var(--text-subtle)]">Password strength</span>
        <span className={`font-semibold ${textColor}`}>{label}</span>
      </div>

      {/* Progress Bar Segments */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full rounded-full transition-all duration-300 ${
              step <= score ? color : 'bg-white/[0.08]'
            }`}
          />
        ))}
      </div>

      {/* Requirements Checklist */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
        <div className={`flex items-center gap-1.5 ${checks.length ? 'text-emerald-400 font-medium' : 'text-[var(--text-subtle)]'}`}>
          {checks.length ? <Check size={12} /> : <X size={12} className="opacity-50" />}
          <span>8+ characters</span>
        </div>

        <div className={`flex items-center gap-1.5 ${checks.hasUpper ? 'text-emerald-400 font-medium' : 'text-[var(--text-subtle)]'}`}>
          {checks.hasUpper ? <Check size={12} /> : <X size={12} className="opacity-50" />}
          <span>Uppercase letter</span>
        </div>

        <div className={`flex items-center gap-1.5 ${checks.hasNumber ? 'text-emerald-400 font-medium' : 'text-[var(--text-subtle)]'}`}>
          {checks.hasNumber ? <Check size={12} /> : <X size={12} className="opacity-50" />}
          <span>Number</span>
        </div>

        <div className={`flex items-center gap-1.5 ${checks.hasSpecial ? 'text-emerald-400 font-medium' : 'text-[var(--text-subtle)]'}`}>
          {checks.hasSpecial ? <Check size={12} /> : <X size={12} className="opacity-50" />}
          <span>Special symbol</span>
        </div>
      </div>
    </div>
  );
}
