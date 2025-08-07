import Script from "next/script";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "QRFlow",
    description:
      "Free QR code generator for URLs, Wi-Fi, contacts, phone numbers, and text. Create professional QR codes with AI-powered design tools.",
    url: "https://yourdomain.com",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "QRFlow",
    },
    featureList: [
      "URL QR codes",
      "Wi-Fi QR codes",
      "Contact QR codes",
      "Phone number QR codes",
      "Text QR codes",
      "Custom logos",
      "AI design advisor",
      "PNG download",
    ],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
