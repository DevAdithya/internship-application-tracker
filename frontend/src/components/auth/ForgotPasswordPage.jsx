import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export default function ForgotPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
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
          Reset password
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Enter your email address and we'll send you a password reset link.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. dev@example.com"
            leftIcon={<Mail size={16} />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            error={error}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            rightIcon={<Send size={16} />}
          >
            Send Reset Link
          </Button>
        </form>
      ) : (
        /* Success State Card */
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 size={28} />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-[var(--text-main)]">Reset link sent!</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              We've sent password reset instructions to <strong className="text-emerald-400 font-mono">{email}</strong>.
            </p>
          </div>

          <div className="pt-2 border-t border-emerald-500/20 space-y-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => onNavigate('reset-password', { email })}
            >
              Demo: Proceed to Reset Password screen →
            </Button>

            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              <RefreshCw size={12} />
              <span>Didn't receive email? Try again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
