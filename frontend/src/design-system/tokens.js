/**
 * InternTrack Design System — JS Token Reference
 * Single source of truth for all design decisions.
 * Inspired by Stripe, Linear, Vercel, Notion, Framer.
 *
 * Use these in JS/JSX for dynamic styles or classNames.
 * The CSS counterpart lives in tokens.css (Tailwind @theme).
 */

// ─── Color Palette ──────────────────────────────────────────────────────────

export const colors = {
  // Brand — Teal (primary interactive color, matching ClientApp.css)
  brand: {
    50:  '#e6f7f3',
    100: '#cceee7',
    200: '#99ddd0',
    300: '#66ccb8',
    400: '#52c4a8',
    500: '#52c4a8', // primary
    600: '#3a9e88',
    700: '#2d7a69',
    800: '#1f564a',
    900: '#1a3a35',
    950: '#0f2420',
  },

  // Violet — Secondary accent (for gradients, premium feel)
  violet: {
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
  },

  // Neutral — Cool gray with subtle blue tint (Vercel/Linear inspired)
  neutral: {
    0:   '#ffffff',
    50:  '#f8fafc',
    100: '#f1f5f9',
    150: '#eaeff6',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    850: '#162032',
    900: '#0f172a',
    950: '#090d16',
  },

  // Semantic
  success: {
    50:  '#ecfdf5',
    100: '#d1fae5',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    900: '#064e3b',
  },

  warning: {
    50:  '#fffbeb',
    100: '#fef3c7',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    900: '#78350f',
  },

  danger: {
    50:  '#fff1f2',
    100: '#ffe4e6',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    900: '#881337',
  },

  info: {
    50:  '#eff6ff',
    100: '#dbeafe',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },

  // Status colors (matching existing App)
  status: {
    wishlist:   '#06b6d4',
    applied:    '#3b82f6',
    assessment: '#8b5cf6',
    interview:  '#f59e0b',
    offered:    '#10b981',
    rejected:   '#f43f5e',
  },
};

// ─── Typography ─────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans:    "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading: "'Outfit', 'Plus Jakarta Sans', sans-serif",
    mono:    "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
  fontSize: {
    '2xs': ['0.625rem', { lineHeight: '0.875rem' }],  // 10px
    xs:   ['0.75rem',  { lineHeight: '1rem' }],        // 12px
    sm:   ['0.8125rem',{ lineHeight: '1.25rem' }],     // 13px
    base: ['0.875rem', { lineHeight: '1.5rem' }],      // 14px
    md:   ['1rem',     { lineHeight: '1.625rem' }],    // 16px
    lg:   ['1.125rem', { lineHeight: '1.75rem' }],     // 18px
    xl:   ['1.25rem',  { lineHeight: '1.875rem' }],    // 20px
    '2xl':['1.5rem',   { lineHeight: '2rem' }],        // 24px
    '3xl':['1.875rem', { lineHeight: '2.25rem' }],     // 30px
    '4xl':['2.25rem',  { lineHeight: '2.5rem' }],      // 36px
    '5xl':['3rem',     { lineHeight: '3.5rem' }],      // 48px
  },
  fontWeight: {
    normal:   '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
    extrabold:'800',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight:   '-0.025em',
    normal:  '0em',
    wide:    '0.025em',
    wider:   '0.05em',
    widest:  '0.1em',
  },
};

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
  0:    '0px',
  px:   '1px',
  0.5:  '2px',
  1:    '4px',
  1.5:  '6px',
  2:    '8px',
  2.5:  '10px',
  3:    '12px',
  3.5:  '14px',
  4:    '16px',
  5:    '20px',
  6:    '24px',
  7:    '28px',
  8:    '32px',
  9:    '36px',
  10:   '40px',
  11:   '44px',
  12:   '48px',
  14:   '56px',
  16:   '64px',
  18:   '72px',
  20:   '80px',
  24:   '96px',
  28:   '112px',
  32:   '128px',
};

// ─── Border Radius ───────────────────────────────────────────────────────────

export const borderRadius = {
  none:  '0px',
  sm:    '4px',
  base:  '6px',
  md:    '8px',
  lg:    '12px',
  xl:    '16px',
  '2xl': '20px',
  '3xl': '24px',
  full:  '9999px',
};

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const shadows = {
  xs:    '0 1px 2px rgba(0,0,0,0.05)',
  sm:    '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  md:    '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
  lg:    '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
  xl:    '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
  '2xl': '0 25px 50px rgba(0,0,0,0.25)',
  inner: 'inset 0 2px 4px rgba(0,0,0,0.06)',
  none:  'none',

  // Glow shadows (brand)
  glow:       '0 0 20px rgba(82,196,168,0.25)',
  'glow-sm':  '0 0 10px rgba(82,196,168,0.2)',
  'glow-lg':  '0 0 40px rgba(82,196,168,0.3)',
};

// ─── Transitions ─────────────────────────────────────────────────────────────

export const transitions = {
  fast:   '100ms cubic-bezier(0.4, 0, 0.2, 1)',
  base:   '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow:   '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '400ms cubic-bezier(0.16, 1, 0.3, 1)',
};

// ─── Z-Index ──────────────────────────────────────────────────────────────────

export const zIndex = {
  base:    0,
  raised:  1,
  dropdown: 10,
  sticky:  20,
  fixed:   30,
  overlay: 40,
  modal:   50,
  toast:   60,
  tooltip: 70,
};

// ─── Animation Durations ─────────────────────────────────────────────────────

export const animation = {
  durations: {
    instant:  '0ms',
    fast:     '100ms',
    base:     '150ms',
    normal:   '200ms',
    slow:     '300ms',
    slower:   '400ms',
    sluggish: '500ms',
  },
};

// ─── Component Size Scales ───────────────────────────────────────────────────

export const componentSizes = {
  xs:  { height: '28px', px: '8px',  fontSize: '0.72rem', iconSize: 12 },
  sm:  { height: '32px', px: '10px', fontSize: '0.8125rem', iconSize: 14 },
  md:  { height: '36px', px: '12px', fontSize: '0.875rem', iconSize: 16 },
  lg:  { height: '40px', px: '16px', fontSize: '1rem',   iconSize: 18 },
  xl:  { height: '48px', px: '20px', fontSize: '1.0625rem', iconSize: 20 },
};
