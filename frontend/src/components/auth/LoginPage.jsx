import React, { useState } from 'react';
import { Mail, Lock, LogIn, User, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Input, Checkbox } from '../ui/Input';
import { Button } from '../ui/Button';

export default function LoginPage({ onNavigate, onDemoLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Frontend demo simulation
    setTimeout(() => {
      setLoading(false);
      onDemoLogin('client');
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
          Welcome back
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Sign in to your InternTrack account to manage applications.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. dev@example.com"
          leftIcon={<Mail size={16} />}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
          }}
          error={errors.email}
          required
        />

        <div className="space-y-1">
          <Input
            label="Password"
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

          <div className="flex items-center justify-between pt-1">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={<ArrowRight size={16} />}
        >
          Sign In
        </Button>
      </form>

      {/* Quick Demo Login Cards */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-[var(--border-color)] space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-main)]">
          <Sparkles size={14} className="text-amber-400" />
          <span>Quick 1-Click Demo Logins:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            leftIcon={<User size={14} className="text-indigo-400" />}
            onClick={() => onDemoLogin('client')}
          >
            Demo Client
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            leftIcon={<ShieldCheck size={14} className="text-emerald-400" />}
            onClick={() => onDemoLogin('admin')}
          >
            Demo Admin
          </Button>
        </div>
      </div>

      {/* Link to Register */}
      <div className="text-center text-xs text-[var(--text-muted)] pt-2">
        Don't have an account?{' '}
        <button
          onClick={() => onNavigate('register')}
          className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
        >
          Create an account
        </button>
      </div>
    </div>
  );
}
