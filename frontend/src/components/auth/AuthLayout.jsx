import React, { useState } from 'react';
import { Sun, Moon, ArrowLeft, Briefcase, X } from 'lucide-react';
import AuthShowcase from './AuthShowcase';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import VerifyEmailPage from './VerifyEmailPage';

export default function AuthLayout({
  initialView = 'login',
  onClose,
  onLoginSuccess,
  theme,
  toggleTheme,
}) {
  const [currentView, setCurrentView] = useState(initialView); // 'login' | 'register' | 'forgot-password' | 'reset-password' | 'verify-email'
  const [passedData, setPassedData] = useState({});

  const handleNavigate = (view, data = {}) => {
    setPassedData(data);
    setCurrentView(view);
  };

  const handleDemoLogin = (role = 'client') => {
    const demoUser = {
      _id: role === 'admin' ? 'demo_admin_id' : 'demo_client_id',
      name: role === 'admin' ? 'Alex Rivera (Recruiter)' : 'Devadithya (Applicant)',
      email: role === 'admin' ? 'admin@interntrack.com' : 'client@interntrack.com',
      role: role,
      phone: '+94 77 123 4567',
      avatar:
        role === 'admin'
          ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
          : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      bio: role === 'admin' ? 'Senior Recruiter' : 'Full Stack Developer',
      resumeLink: 'https://drive.google.com/sample-resume.pdf',
      preferredLocation: 'Colombo / Remote',
      token: 'demo_jwt_token_2026',
    };

    if (onLoginSuccess) onLoginSuccess(demoUser);
    if (onClose) onClose();
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col justify-between font-sans relative overflow-hidden transition-colors duration-200">
      {/* Animated ambient background glow elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-20 h-16 px-4 sm:px-8 flex items-center justify-between">
        {/* Mobile / Left Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Briefcase size={18} />
          </div>
          <span className="font-extrabold text-base text-[var(--text-main)] tracking-tight">
            InternTrack
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.06] transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-400" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.06] transition-all"
              title="Close"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Split Shell */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl min-h-[600px] rounded-3xl bg-[var(--bg-surface)] backdrop-blur-2xl border border-[var(--border-color)] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-300">
          {/* Left Hero Graphic Showcase (Desktop) */}
          <AuthShowcase />

          {/* Right Form Container */}
          <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-12 overflow-y-auto">
            {currentView === 'login' && (
              <LoginPage onNavigate={handleNavigate} onDemoLogin={handleDemoLogin} />
            )}

            {currentView === 'register' && (
              <RegisterPage onNavigate={handleNavigate} onDemoLogin={handleDemoLogin} />
            )}

            {currentView === 'forgot-password' && (
              <ForgotPasswordPage onNavigate={handleNavigate} />
            )}

            {currentView === 'reset-password' && (
              <ResetPasswordPage onNavigate={handleNavigate} email={passedData.email} />
            )}

            {currentView === 'verify-email' && (
              <VerifyEmailPage
                onNavigate={handleNavigate}
                email={passedData.email}
                onDemoLogin={handleDemoLogin}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-4 text-center text-xs text-[var(--text-subtle)]">
        © 2026 InternTrack • Enterprise Application Tracking Platform
      </footer>
    </div>
  );
}
