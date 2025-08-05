import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "QRickit - Free QR Code Generator | Create Custom QR Codes Instantly",
  description:
    "Generate professional QR codes for URLs, Wi-Fi, contacts, phone numbers, and text instantly. Free QR code maker with AI-powered design tools and custom logos. Download high-quality PNG images.",
  keywords:
    "QR code generator, free QR code, create QR code, QR maker, Wi-Fi QR code, contact QR code, URL QR code, custom QR code, QR code with logo",
  authors: [{ name: "QRickit" }],
  creator: "QRickit",
  publisher: "QRickit",
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QRickit - Free QR Code Generator",
    description:
      "Create professional QR codes instantly. Support for URLs, Wi-Fi, contacts, and more. AI-powered design tools included.",
    url: "https://yourdomain.com",
    siteName: "QRickit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QRickit QR Code Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QRickit - Free QR Code Generator",
    description:
      "Create professional QR codes instantly. Support for URLs, Wi-Fi, contacts, and more.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-body antialiased min-h-screen"
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
