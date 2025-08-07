"use client";
import { AuthProvider } from "@/contexts/auth-context";

export function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
