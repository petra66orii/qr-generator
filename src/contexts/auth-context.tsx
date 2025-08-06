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
        // Handle Firestore permissions error gracefully
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
          console.error("Error setting up user profile:", error);
          // Handle Firestore permissions error gracefully
          if (
            error instanceof Error &&
            "code" in error &&
            error.code === "permission-denied"
          ) {
            console.warn(
              "Firestore not enabled or rules not deployed. Authentication will work without user profiles."
            );
            setUserProfile(null);
          }
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
