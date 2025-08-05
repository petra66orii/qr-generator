"use client";
import { useState } from "react";
import { QrCodeGenerator } from "@/components/qr-code-generator";
import { QrCodeIcon } from "@/components/icons";
import { AuthForm } from "@/components/AuthForm";
import { StructuredData } from "@/components/structured-data";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { user } = useAuth();

  // Close auth form when user logs in
  if (user && showAuthForm) {
    setShowAuthForm(false);
  }

  return (
    <>
      <StructuredData />
      <Navbar onAuthClick={() => setShowAuthForm(true)} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-4 mb-4">
            <QrCodeIcon className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
              QRickit - Free QR Code Generator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional QR codes instantly for URLs, Wi-Fi networks,
            contact information, phone numbers, and text. Free QR code maker
            with AI-powered design tools and custom logos.
          </p>
        </header>

        <main>
          {showAuthForm ? (
            <div className="space-y-6">
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowAuthForm(false)}
                  className="mb-4"
                >
                  ← Back to QR Generator
                </Button>
              </div>
              <AuthForm />
            </div>
          ) : (
            <QrCodeGenerator />
          )}
        </main>

        {/* Features Section */}
        <section id="features" className="mt-16 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Why Choose QRickit for QR Code Generation?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-center">
            QRickit is the ultimate free QR code generator that helps you create
            professional, customizable QR codes in seconds. Whether you need QR
            codes for business cards, marketing materials, or personal use, our
            tool provides everything you need.
          </p>

          <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">
            Supported QR Code Types
          </h3>
          <ul className="space-y-3 mb-8 text-center">
            <li className="text-muted-foreground">
              <strong className="text-foreground">URL QR Codes:</strong> Perfect
              for websites, landing pages, and online content
            </li>
            <li className="text-muted-foreground">
              <strong className="text-foreground">Wi-Fi QR Codes:</strong> Share
              network credentials instantly
            </li>
            <li className="text-muted-foreground">
              <strong className="text-foreground">Contact QR Codes:</strong>{" "}
              vCard format for easy contact sharing
            </li>
            <li className="text-muted-foreground">
              <strong className="text-foreground">Phone QR Codes:</strong>{" "}
              Direct dial functionality
            </li>
            <li className="text-muted-foreground">
              <strong className="text-foreground">Text QR Codes:</strong> Plain
              text messages and information
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">
            Premium AI Features
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            Upgrade to access our AI-powered design advisor that provides
            optimal size, color, and style recommendations based on your use
            case. Generate custom logos with our AI logo creator for truly
            unique QR codes.
          </p>
        </section>

        {/* Help Section */}
        <section id="help" className="mt-16 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Need Help?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Quick Start Guide</h3>
              <p className="text-muted-foreground">
                New to QR codes? Our step-by-step guide will help you create
                your first QR code in minutes.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
              <p className="text-muted-foreground">
                Learn how to optimize your QR codes for maximum scannability and
                professional appearance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
