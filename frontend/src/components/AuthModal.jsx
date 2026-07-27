import React from "react";
import AuthLayout from "./auth/AuthLayout";

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onRegisterSuccess,
  theme,
  toggleTheme,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-primary)]">
      <AuthLayout
        initialView="login"
        onClose={onClose}
        onLoginSuccess={(user) => {
          onLoginSuccess(user);
          if (onRegisterSuccess) onRegisterSuccess(user);
        }}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}
