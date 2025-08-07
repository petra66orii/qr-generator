"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { AuthForm } from "@/components/AuthForm";

export default function PrivacyPage() {
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    document.title = "Privacy Policy - QRFlow";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "QRFlow's privacy policy explaining how we collect, use, and protect your personal information."
      );
    }
  }, []);

  return (
    <>
      <Navbar onAuthClick={() => setShowAuthForm(true)} />

      {showAuthForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sign In</h2>
              <button
                onClick={() => setShowAuthForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            <AuthForm />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-medium my-3">Account Information</h3>
            <p className="text-muted-foreground mb-4">
              When you create an account with QRFlow, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Email address (required for account creation)</li>
              <li>Password (encrypted and securely stored)</li>
              <li>Account preferences and settings</li>
            </ul>

            <h3 className="text-xl font-medium my-3">QR Code Data</h3>
            <p className="text-muted-foreground mb-4">
              QRFlow processes the following data when you generate QR codes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>URLs, text, and contact information you input</li>
              <li>Wi-Fi network names and passwords (processed locally)</li>
              <li>Generated QR code images (temporarily processed)</li>
              <li>AI prompts for logo generation and design advice</li>
            </ul>

            <h3 className="text-xl font-medium my-3">Usage Information</h3>
            <p className="text-muted-foreground mb-4">
              We automatically collect certain information about your use of our
              service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and general location</li>
              <li>Usage patterns and feature interactions</li>
              <li>Error logs and performance metrics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide and maintain our QR code generation service</li>
              <li>Process your requests for premium AI features</li>
              <li>Send important account and service updates</li>
              <li>Improve our service through analytics and user feedback</li>
              <li>Prevent fraud and ensure service security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Data Processing and Storage
            </h2>

            <h3 className="text-xl font-medium mb-3">QR Code Generation</h3>
            <p className="text-muted-foreground mb-4">
              QR codes are generated in your browser using client-side
              JavaScript. The data you input is not stored on our servers unless
              you save it to your account.
            </p>

            <h3 className="text-xl font-medium mb-3">AI Features</h3>
            <p className="text-muted-foreground mb-4">
              When using premium AI features (logo generation, design advice),
              your prompts are sent to Google AI services. We do not store
              AI-generated content permanently.
            </p>

            <h3 className="text-xl font-medium mb-3">Data Retention</h3>
            <p className="text-muted-foreground mb-4">
              We retain your account information as long as your account is
              active. You can request account deletion at any time through our
              support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Information Sharing
            </h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information. We may
              share information only in these cases:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and prevent fraud</li>
              <li>
                With service providers who help us operate our service
                (Firebase, Google AI)
              </li>
            </ul>
          </section>

          <section id="cookies">
            <h2 className="text-2xl font-semibold mb-4">
              5. Cookies and Tracking
            </h2>
            <p className="text-muted-foreground mb-4">
              QRFlow uses essential cookies to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Maintain your login session</li>
              <li>Remember your theme preferences</li>
              <li>Provide security features</li>
              <li>Analyze usage patterns (anonymized)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You can control cookies through your browser settings, but some
              features may not work properly if cookies are disabled.
            </p>
          </section>

          <section id="gdpr">
            <h2 className="text-2xl font-semibold mb-4">
              6. Your Rights (GDPR)
            </h2>
            <p className="text-muted-foreground mb-4">
              If you're in the European Union, you have these rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Rectification:</strong> Correct inaccurate personal data
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your personal data
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a
                machine-readable format
              </li>
              <li>
                <strong>Objection:</strong> Object to processing of your
                personal data
              </li>
              <li>
                <strong>Restriction:</strong> Request limitation of processing
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, contact us at privacy@QRFlow.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your
              information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All data transmission is encrypted using SSL/TLS</li>
              <li>Passwords are hashed using industry-standard methods</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-muted-foreground mb-4">
              QRFlow is not intended for children under 13. We do not knowingly
              collect personal information from children under 13. If you become
              aware that a child has provided us with personal information,
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this privacy policy, please contact
              us:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Email: privacy@QRFlow.com</li>
              <li>Support: support@QRFlow.com</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
