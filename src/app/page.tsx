"use client";
import { useState } from "react";
import { QrCodeGenerator } from "@/components/qr-code-generator";
import { QrCodeIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthForm } from "@/components/AuthForm";
import { StructuredData } from "@/components/structured-data";

export default function Home() {
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <>
      <StructuredData />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setShowAuthForm(true)}
            className="text-sm px-3 py-1 rounded bg-black text-white hover:bg-gray-800"
          >
            Log In / Register
          </button>
        </div>

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
        <main>{showAuthForm ? <AuthForm /> : <QrCodeGenerator />}</main>

        {/* SEO Content Section */}
        <section className="mt-16 prose prose-gray dark:prose-invert max-w-4xl mx-auto">
          <h2>Why Choose QRickit for QR Code Generation?</h2>
          <p>
            QRickit is the ultimate free QR code generator that helps you create
            professional, customizable QR codes in seconds. Whether you need QR
            codes for business cards, marketing materials, or personal use, our
            tool provides everything you need.
          </p>

          <h3>Supported QR Code Types</h3>
          <ul>
            <li>
              <strong>URL QR Codes:</strong> Perfect for websites, landing
              pages, and online content
            </li>
            <li>
              <strong>Wi-Fi QR Codes:</strong> Share network credentials
              instantly
            </li>
            <li>
              <strong>Contact QR Codes:</strong> vCard format for easy contact
              sharing
            </li>
            <li>
              <strong>Phone QR Codes:</strong> Direct dial functionality
            </li>
            <li>
              <strong>Text QR Codes:</strong> Plain text messages and
              information
            </li>
          </ul>

          <h3>Premium AI Features</h3>
          <p>
            Upgrade to access our AI-powered design advisor that provides
            optimal size, color, and style recommendations based on your use
            case. Generate custom logos with our AI logo creator for truly
            unique QR codes.
          </p>
        </section>
      </div>
    </>
  );
}
