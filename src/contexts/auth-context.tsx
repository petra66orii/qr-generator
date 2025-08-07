"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  initializeUserProfile,
  UserService,
  UserProfile,
} from "@/lib/database";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  logout: async () => {},
  refreshUserProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserProfile = async () => {
    if (user) {
      try {
        const profile = await UserService.getById(user.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (
          error instanceof Error &&
          "code" in error &&
          error.code === "permission-denied"
        ) {
          console.warn(
            "Firestore not enabled or rules not deployed. Operating without user profile."
          );
          setUserProfile(null);
        }
      }
    }
  };

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | null = null;

    const setupAuth = async () => {
      try {
        // Give Firebase time to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const authInstance = auth();
        if (!authInstance) {
          console.warn("Firebase auth not available");
          setLoading(false);
          return;
        }

        unsubscribe = onAuthStateChanged(authInstance, async (user) => {
          setUser(user);

          if (user) {
            try {
              // Check if user profile exists, create if not
              let profile = await UserService.getById(user.uid);
              if (!profile) {
                await initializeUserProfile(
                  user.uid,
                  user.email || "",
                  user.displayName || undefined
                );
                profile = await UserService.getById(user.uid);
              }
              setUserProfile(profile);
            } catch (error) {
              console.error("Error handling user profile:", error);
              if (
                error instanceof Error &&
                "code" in error &&
                error.code === "permission-denied"
              ) {
                console.warn(
                  "Firestore not enabled. Authentication will work without user profiles."
                );
                setUserProfile(null);
              }
            }
          } else {
            setUserProfile(null);
          }

          setLoading(false);
        });
      } catch (error) {
        console.error("Error setting up auth:", error);
        setLoading(false);
      }
    };

    setupAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const logout = async () => {
    try {
      const authInstance = auth();
      if (authInstance) {
        await signOut(authInstance);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userProfile, loading, logout, refreshUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
