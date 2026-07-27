import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export default function VerifyEmailPage({ onNavigate, email, onDemoLogin }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // Countdown timer for resend link
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const updated = [...code];
    updated[index] = value.slice(-1);
    setCode(updated);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVerified(true);
    }, 1200);
  };

  const isComplete = code.every((digit) => digit !== '');

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 text-center lg:text-left">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto lg:mx-0">
          <Mail size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
          Verify your email
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          We sent a 6-digit verification code to{' '}
          <strong className="text-indigo-400 font-mono">{email || 'user@example.com'}</strong>.
        </p>
      </div>

      {!verified ? (
        <div className="space-y-6">
          {/* 6-Digit PIN Inputs */}
          <div className="flex justify-center sm:justify-start gap-2 sm:gap-3">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-12 sm:w-12 sm:h-14 text-center font-mono font-bold text-lg text-[var(--text-main)] bg-white/[0.04] border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            ))}
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isComplete}
            loading={loading}
            onClick={handleVerify}
            rightIcon={<ArrowRight size={16} />}
          >
            Verify Account
          </Button>

          {/* Resend Code Option */}
          <div className="text-center lg:text-left text-xs text-[var(--text-muted)]">
            {resendTimer > 0 ? (
              <span>Resend code in <strong className="text-indigo-400">{resendTimer}s</strong></span>
            ) : (
              <button
                onClick={() => setResendTimer(60)}
                className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center justify-center lg:justify-start gap-1 mx-auto lg:mx-0"
              >
                <RefreshCw size={12} />
                <span>Resend verification code</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Verified Success Box */
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 size={28} />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-[var(--text-main)]">Email Verified!</h3>
            <p className="text-xs text-[var(--text-muted)]">
              Your account is fully verified. You can now access your application pipeline.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => onDemoLogin('client')}
          >
            Go to Dashboard →
          </Button>
        </div>
      )}
    </div>
  );
}
