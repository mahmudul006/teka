import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";

export function AuthContainer() {
  const { isAuthenticated, login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const switchToLogin = () => setMode('login');
  const switchToSignup = () => setMode('signup');

  if (mode === 'signup') {
    return (
      <Signup
        isAuthenticated={isAuthenticated}
        onSignup={signup}
        onSwitchToLogin={switchToLogin}
      />
    );
  }

  return (
    <Login
      isAuthenticated={isAuthenticated}
      onLogin={login}
      onSwitchToSignup={switchToSignup}
    />
  );
} 