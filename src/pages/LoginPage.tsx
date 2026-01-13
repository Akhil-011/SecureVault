import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import LightRays from '@/components/LightRays';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { login, signup } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (!isLogin && !name)) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const success = isLogin 
      ? await login(email, password)
      : await signup(email, password, name);

    if (success) {
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "Successfully logged in" : "Your vault is ready",
      });
    }
  };

  const handleForgotPassword = () => {
    if (!resetEmail) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password reset link sent",
      description: `Check your email at ${resetEmail} for reset instructions`,
    });
    setShowForgotPassword(false);
    setResetEmail('');
  };

  return (
    <div className="relative min-h-screen bg-vault-gradient flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <div className="relative w-full max-w-sm space-y-6 z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <img
              src="https://ik.imagekit.io/b45loridy/vault%20logo.jpg"
              alt="SecureVault logo"
              className="h-20 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground">SecureVault</h1>
          <p className="text-muted-foreground text-base">
            Your personal digital storage solution
          </p>
        </div>

        {/* Login/Signup Form */}
        <Card className="p-6 vault-card border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isLogin ? 'Sign in to access your vault' : 'Sign up to get started'}
              </p>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-vault-dark border-border"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-vault-dark border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Password <span className="text-destructive">*</span>
                </Label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-vault-dark border-border"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            <div className="text-center pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span className="text-primary font-medium">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </span>
              </button>
            </div>
          </form>
        </Card>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleForgotPassword} className="flex-1">
                Send Reset Link
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
