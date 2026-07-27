import React, { useState } from 'react';
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import PasswordStrengthMeter, { calculatePasswordStrength } from './PasswordStrengthMeter';

export default function ResetPasswordPage({ onNavigate, email }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!password) {
      errs.password = 'New password is required';
    } else {
      const { score } = calculatePasswordStrength(password);
      if (score < 2) {
        errs.password = 'Please choose a stronger password';
      }
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Back Link */}
      <button
        onClick={() => onNavigate('login')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to sign in</span>
      </button>

      {/* Header */}
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
          Create new password
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Resetting password for <strong className="text-indigo-400 font-mono">{email || 'user@example.com'}</strong>.
        </p>
      </div>

      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock size={16} />}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              error={errors.password}
              required
            />
            <PasswordStrengthMeter password={password} />
          </div>

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock size={16} />}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: null }));
            }}
            error={errors.confirmPassword}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            Reset Password
          </Button>
        </form>
      ) : (
        /* Success Redirect Box */
        <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
            <CheckCircle2 size={28} />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-[var(--text-main)]">Password reset successful!</h3>
            <p className="text-xs text-[var(--text-muted)]">
              Your password has been updated. You can now sign in with your new credentials.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => onNavigate('login')}
          >
            Sign In with New Password
          </Button>
        </div>
      )}
    </div>
  );
}
