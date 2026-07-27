import React, { useState } from 'react';
import { User, Mail, Lock, Phone, UserPlus, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
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
