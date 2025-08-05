"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
      }
    } catch (err: any) {
      const errorMessage = err.message.replace("Firebase: ", "");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password reset email sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <User className="w-5 h-5" />
          {isLogin ? "Welcome Back" : "Create Account"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </Button>

          {isLogin && (
            <Button
              type="button"
              variant="ghost"
              className="w-full text-sm"
              onClick={handleForgotPassword}
            >
              Forgot your password?
            </Button>
          )}

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-sm"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
