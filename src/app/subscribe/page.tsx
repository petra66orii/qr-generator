"use client";

import { useState } from "react";
import { PricingCards } from "@/components/pricing-cards";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/contexts/auth-context";

export default function SubscribePage() {
  const { user } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      // Redirect to login if user not authenticated
      setShowAuthForm(true);
      return;
    }
    // Plan selection is handled in PricingCards component
  };

  return (
    <>
      <Navbar onAuthClick={() => setShowAuthForm(true)} />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upgrade to Premium and unlock unlimited QR codes, AI-powered
            features, and advanced customization options.
          </p>
        </div>

        <PricingCards onSelectPlan={handleSelectPlan} />

        {/* Features Comparison */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Premium?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">AI-Powered Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• AI logo generation for branded QR codes</li>
                <li>• Smart design recommendations</li>
                <li>• Optimal size and placement advice</li>
                <li>• Use case-specific suggestions</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Enhanced Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Unlimited QR code generation</li>
                <li>• All QR code types available</li>
                <li>• QR code history and storage</li>
                <li>• Basic scan tracking</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Storage & Organization</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Save and organize your QR codes</li>
                <li>• Access QR code history</li>
                <li>• Track basic usage statistics</li>
                <li>• Export and share easily</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Future Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Advanced analytics (coming soon)</li>
                <li>• Custom color themes (coming soon)</li>
                <li>• Multiple export formats (coming soon)</li>
                <li>• Priority support (coming soon)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              30-Day Money Back Guarantee
            </h3>
            <p className="text-muted-foreground">
              Try Premium risk-free. If you're not completely satisfied within
              30 days, we'll refund your purchase, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
