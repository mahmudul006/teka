import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/useTheme";
import { type SignupCredentials } from "@/utilities/api";
import { useState } from "react";
import { Navigate } from "react-router-dom";

interface SignupProps {
  isAuthenticated: boolean;
  onSignup: (credentials: SignupCredentials) => Promise<void>;
  onSwitchToLogin: () => void;
}

export function Signup({ isAuthenticated, onSignup, onSwitchToLogin }: SignupProps) {
  const { toggleTheme, theme } = useTheme();
  const [formData, setFormData] = useState<SignupCredentials>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await onSignup(formData);
      onSwitchToLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your username and password to create a new account
          </CardDescription>
          <div className="flex justify-between">
            <Button variant="link" onClick={onSwitchToLogin}>
              Already have an account? Login
            </Button>
            <Button onClick={toggleTheme} variant="outline" size="sm">
              {theme === 'dark' ? '☀️' : '🌙'} {theme}
            </Button>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-4">
              {error && (
                <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 6 characters long
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col gap-2">
            <Button 
              type="submit" 
              className="w-full" 
              variant="default" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 