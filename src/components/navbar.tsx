"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { QrCodeIcon } from "@/components/icons";
import {
  User,
  LogOut,
  Menu,
  X,
  Home,
  CreditCard,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onAuthClick: () => void;
}

export function Navbar({ onAuthClick }: NavbarProps) {
  const { user, loading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      onAuthClick();
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "Generator", icon: Home },
    { href: "/subscribe", label: "Pricing", icon: CreditCard },
    { href: "#features", label: "Features", icon: Sparkles },
    { href: "#help", label: "Help", icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <QrCodeIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">QRFlow</span>
          </Link>{" "}
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          {/* Desktop Auth & Theme */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <span className="text-sm text-muted-foreground">
                Welcome, {user.email?.split("@")[0]}!
              </span>
            )}
            <ThemeToggle />
            {!loading && (
              <Button
                variant={user ? "outline" : "default"}
                size="sm"
                onClick={handleAuthAction}
                className="flex items-center gap-2"
              >
                {user ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </Button>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="pt-4 border-t">
                {user && (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Welcome, {user.email?.split("@")[0]}!
                  </div>
                )}
                {!loading && (
                  <Button
                    variant={user ? "outline" : "default"}
                    className="w-full flex items-center gap-2 mx-3"
                    onClick={handleAuthAction}
                  >
                    {user ? (
                      <>
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
