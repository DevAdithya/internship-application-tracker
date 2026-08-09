import React, { useState } from 'react';
import { User, Mail, Lock, Phone, UserPlus, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';
import { Input, Select, Checkbox } from '../ui/Input';
import { Button } from '../ui/Button';
import PasswordStrengthMeter, { calculatePasswordStrength } from './PasswordStrengthMeter';

export default function RegisterPage({ onNavigate, onDemoLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('client');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required';

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else {
      const { score } = calculatePasswordStrength(password);
      if (score < 2) {
        errs.password = 'Please create a stronger password';
      }
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (!agreedTerms) {
      errs.agreedTerms = 'You must agree to the Terms of Service';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      onNavigate('verify-email', { email });
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-1.5 text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
          Create an account
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Join InternTrack to organize and automate your internship applications.
        </p>
      </div>

      {/* Google & Social Sign Up Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onDemoLogin && onDemoLogin('client')}
          className="flex items-center justify-center gap-2 h-10 px-3 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 hover:border-emerald-500/40 text-xs font-semibold text-[var(--text-main)] transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={() => onDemoLogin && onDemoLogin('client')}
          className="flex items-center justify-center gap-2 h-10 px-3 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 hover:border-emerald-500/40 text-xs font-semibold text-[var(--text-main)] transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </button>
      </div>

      <div className="flex items-center my-3 text-[11px] text-[var(--text-muted)]">
        <div className="flex-1 border-b border-white/10" />
        <span className="px-2.5">or sign up with details</span>
        <div className="flex-1 border-b border-white/10" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Input
          label="Full Name"
          type="text"
          placeholder="e.g. Devadithya Perera"
          leftIcon={<User size={16} />}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
          }}
          error={errors.name}
          required
        />

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
          {/* Password Strength Meter */}
          <PasswordStrengthMeter password={password} />
        </div>

        <Input
          label="Confirm Password"
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

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+94 77 123 4567"
            leftIcon={<Phone size={16} />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            optional
          />

          <Select
            label="Account Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="client">Client / Job Seeker</option>
            <option value="admin">Recruiter / Admin</option>
          </Select>
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="pt-1">
          <Checkbox
            label="I agree to the Terms of Service & Privacy Policy"
            checked={agreedTerms}
            onChange={(e) => {
              setAgreedTerms(e.target.checked);
              if (errors.agreedTerms) setErrors((prev) => ({ ...prev, agreedTerms: null }));
            }}
            error={errors.agreedTerms}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={<ArrowRight size={16} />}
        >
          Create Account
        </Button>
      </form>

      {/* 1-Click Demo Sign Up Card */}
      {onDemoLogin && (
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-[var(--border-color)] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-main)]">
            <Sparkles size={14} className="text-amber-400" />
            <span>1-Click Quick Sign Up Options:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              leftIcon={<User size={14} className="text-emerald-400" />}
              onClick={() => onDemoLogin('client')}
            >
              Demo Client
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              leftIcon={<ShieldCheck size={14} className="text-teal-400" />}
              onClick={() => onDemoLogin('admin')}
            >
              Demo Admin
            </Button>
          </div>
        </div>
      )}

      {/* Link to Login */}
      <div className="text-center text-xs text-[var(--text-muted)] pt-1">
        Already have an account?{' '}
        <button
          onClick={() => onNavigate('login')}
          className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
        >
          Sign in here
        </button>
      </div>
    </div>
  );
}
