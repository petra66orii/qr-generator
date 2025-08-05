import { Metadata } from "next";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Terms of Service - QRickit",
  description:
    "QRickit's terms of service outlining the conditions for using our QR code generation platform.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar
        onAuthClick={() => {
          /* TODO: handle auth click */
        }}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
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
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using QRickit ("Service"), you accept and agree
              to be bound by the terms and provision of this agreement. If you
              do not agree to abide by the above, please do not use this
              service.
            </p>
            <p className="text-muted-foreground">
              These Terms of Service ("Terms") govern your use of our website
              located at qrickit.com (the "Service") operated by QRickit ("us",
              "we", or "our").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground mb-4">
              QRickit is a web-based platform that provides:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Free QR code generation for URLs, text, Wi-Fi, contacts, and
                phone numbers
              </li>
              <li>
                Premium AI-powered features including logo generation and design
                advice
              </li>
              <li>QR code customization and download capabilities</li>
              <li>User account management and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>

            <h3 className="text-xl font-medium my-3">Account Creation</h3>
            <p className="text-muted-foreground mb-4">
              To access certain features, you may be required to create an
              account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Maintain the security of your password</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
            </ul>

            <h3 className="text-xl font-medium my-3">
              Account Responsibilities
            </h3>
            <p className="text-muted-foreground mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All content and activity that occurs under your account</li>
              <li>Keeping your login information secure</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Acceptable Use Policy
            </h2>

            <h3 className="text-xl font-medium mb-3">Permitted Uses</h3>
            <p className="text-muted-foreground mb-4">
              You may use QRickit for lawful purposes including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Creating QR codes for personal, business, or educational use
              </li>
              <li>
                Sharing contact information, websites, or Wi-Fi credentials
              </li>
              <li>
                Marketing and promotional activities (within legal boundaries)
              </li>
            </ul>

            <h3 className="text-xl font-medium my-3">Prohibited Uses</h3>
            <p className="text-muted-foreground mb-4">
              You may NOT use QRickit to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Create QR codes linking to illegal, harmful, or malicious
                content
              </li>
              <li>Distribute malware, viruses, or other harmful software</li>
              <li>Engage in phishing, scamming, or fraudulent activities</li>
              <li>Violate intellectual property rights</li>
              <li>Harass, abuse, or harm others</li>
              <li>Spam or send unsolicited communications</li>
              <li>Attempt to reverse engineer or hack our service</li>
              <li>Use automated systems to abuse our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Premium Services and Billing
            </h2>

            <h3 className="text-xl font-medium mb-3">Subscription Plans</h3>
            <p className="text-muted-foreground mb-4">
              QRickit offers premium subscription plans that provide additional
              features. By subscribing, you agree to pay the applicable fees.
            </p>

            <h3 className="text-xl font-medium mb-3">Billing Terms</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Subscription fees are billed in advance on a monthly or annual
                basis
              </li>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>
                We reserve the right to change pricing with 30 days notice
              </li>
              <li>
                Your subscription will automatically renew unless cancelled
              </li>
            </ul>

            <h3 className="text-xl font-medium my-3">Cancellation</h3>
            <p className="text-muted-foreground mb-4">
              You may cancel your subscription at any time. Cancellation will
              take effect at the end of the current billing period. You will
              retain access to premium features until then.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Intellectual Property
            </h2>

            <h3 className="text-xl font-medium mb-3">Our Rights</h3>
            <p className="text-muted-foreground mb-4">
              QRickit and its original content, features, and functionality are
              owned by QRickit and are protected by international copyright,
              trademark, patent, trade secret, and other intellectual property
              laws.
            </p>

            <h3 className="text-xl font-medium mb-3">Your Content</h3>
            <p className="text-muted-foreground mb-4">
              You retain ownership of any content you input into QRickit. By
              using our service, you grant us a limited license to process your
              content solely for the purpose of providing our service.
            </p>

            <h3 className="text-xl font-medium mb-3">Generated QR Codes</h3>
            <p className="text-muted-foreground mb-4">
              QR codes generated using QRickit belong to you. You may use them
              freely for any lawful purpose. QRickit does not claim ownership of
              the QR codes you create.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Privacy and Data Protection
            </h2>
            <p className="text-muted-foreground mb-4">
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the Service, to understand our
              practices.
            </p>
            <p className="text-muted-foreground">
              We process QR code data locally in your browser when possible.
              Premium AI features may send data to third-party services (Google
              AI) for processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Disclaimers and Limitations
            </h2>

            <h3 className="text-xl font-medium mb-3">Service Availability</h3>
            <p className="text-muted-foreground mb-4">
              We strive to provide reliable service but cannot guarantee 100%
              uptime. The service is provided "as is" without warranties of any
              kind.
            </p>

            <h3 className="text-xl font-medium mb-3">
              Limitation of Liability
            </h3>
            <p className="text-muted-foreground mb-4">
              In no event shall QRickit be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of your
              use of the service.
            </p>

            <h3 className="text-xl font-medium mb-3">Third-Party Services</h3>
            <p className="text-muted-foreground mb-4">
              Our service integrates with third-party services (Firebase, Google
              AI). We are not responsible for the availability, content, or
              practices of these third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
            <p className="text-muted-foreground mb-4">
              We may terminate or suspend your account and access to the service
              immediately, without prior notice, for conduct that we believe
              violates these Terms or is harmful to other users, us, or third
              parties.
            </p>
            <p className="text-muted-foreground">
              Upon termination, your right to use the service will cease
              immediately. If you wish to terminate your account, you may simply
              discontinue using the service or contact our support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. Changes to Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these terms at any time. We will
              provide notice of significant changes by posting the new terms on
              our website and updating the "Last updated" date.
            </p>
            <p className="text-muted-foreground">
              Your continued use of the service after any such changes
              constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These terms shall be governed by and construed in accordance with
              the laws of [Your Jurisdiction], without regard to its conflict of
              law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              12. Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Email: legal@qrickit.com</li>
              <li>Support: support@qrickit.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Severability</h2>
            <p className="text-muted-foreground">
              If any provision of these terms is held to be invalid or
              unenforceable, the remaining provisions will remain in full force
              and effect.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
