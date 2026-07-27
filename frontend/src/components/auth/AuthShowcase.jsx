import React from 'react';
import { Briefcase, Sparkles, ShieldCheck, CheckCircle2, TrendingUp, Award, Calendar, Layers } from 'lucide-react';

export default function AuthShowcase() {
  return (
    <div className="relative flex-1 hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-[var(--bg-secondary)] border-r border-[var(--border-color)]">
      {/* Ambient background glow particles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Brand Header */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
          <Briefcase size={22} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-[var(--text-main)] tracking-tight">InternTrack</span>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded">
              PRO
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Enterprise Application Pipeline Platform</p>
        </div>
      </div>

      {/* Middle Interactive Vector Preview Card */}
      <div className="relative z-10 my-auto py-8 space-y-6 max-w-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
            <Sparkles size={14} />
            <span>Next-Gen Career Automation</span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-extrabold text-[var(--text-main)] tracking-tight leading-tight">
            Streamline your Tech Internship Pipeline.
          </h1>
          <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
            Track applications across Google, Stripe, Meta, and top firms. Real-time interview round checklists, analytics, and CSV export.
          </p>
        </div>

        {/* Mock Application Pipeline Card */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-[var(--border-color)] backdrop-blur-xl shadow-2xl space-y-3">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
              <Layers size={14} className="text-indigo-400" />
              <span>Active Pipeline Overview</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              6 Active Roles
            </span>
          </div>

          {/* Sample Mini Rows */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                  G
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--text-main)]">Google</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Software Engineering Intern</div>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-1">
                <Calendar size={10} /> Interview
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  V
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--text-main)]">Virtusa</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Full Stack Developer</div>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1">
                <Award size={10} /> Offered 🎉
              </span>
            </div>
          </div>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-[var(--border-color)] text-center">
            <div className="text-lg font-bold text-[var(--text-main)]">84%</div>
            <div className="text-[10px] text-[var(--text-subtle)] uppercase tracking-wider mt-0.5">Response Rate</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-[var(--border-color)] text-center">
            <div className="text-lg font-bold text-indigo-400">100%</div>
            <div className="text-[10px] text-[var(--text-subtle)] uppercase tracking-wider mt-0.5">Data Privacy</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-[var(--border-color)] text-center">
            <div className="text-lg font-bold text-emerald-400">JWT</div>
            <div className="text-[10px] text-[var(--text-subtle)] uppercase tracking-wider mt-0.5">Encrypted</div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Quote */}
      <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
        <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
        <span className="text-xs text-[var(--text-muted)]">
          Protected with JWT Access Tokens, HTTP-Only Cookie Refresh & Password Hashing.
        </span>
      </div>
    </div>
  );
}
