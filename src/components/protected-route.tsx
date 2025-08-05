"use client";
import { useAuth } from "@/contexts/auth-context";
import { AuthForm } from "@/components/AuthForm";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4 max-w-md mx-auto">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      fallback || (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
            <p className="text-muted-foreground mb-8">
              Please sign in to access this feature.
            </p>
          </div>
          <AuthForm />
        </div>
      )
    );
  }

  return <>{children}</>;
}
