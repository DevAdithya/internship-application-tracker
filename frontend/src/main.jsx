import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';

const root = createRoot(document.getElementById('root'));
const pathname = window.location.pathname;
const search = window.location.search;
const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/auth') || pathname.startsWith('/signin') || pathname.startsWith('/signup') || search.includes('auth=');

(async () => {
  if (isAdminRoute) {
    // Admin site — load existing unchanged app with its own CSS
    await import('./index.css');
    await import('./App.css');
    await import('./nav.css');
    const { default: App } = await import('./App.jsx');
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    // Client site — standalone landing site (no admin CSS loaded)
    const { default: ClientApp } = await import('./ClientApp.jsx');
    root.render(
      <StrictMode>
        <ClientApp />
      </StrictMode>
    );
  }
})();
