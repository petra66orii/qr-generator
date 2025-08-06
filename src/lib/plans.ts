// lib/plans.ts
// Subscription plans configuration
export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: null,
    features: [
      'Up to 10 QR codes per month',
      'Basic QR code types (URL, Text, Phone)',
      'Standard download quality',
      '1 color customization',
    ],
    limits: {
      qrCodesPerMonth: 10,
      aiRequestsPerMonth: 0,
      customColors: 1,
      logoUpload: false,
    },
  },
  PREMIUM_MONTHLY: {
    id: 'premium_monthly',
    name: 'Premium Monthly',
    price: 4.99,
    interval: 'month',
    stripePriceId: 'price_premium_monthly', // Replace with actual Stripe price ID
    features: [
      'Unlimited QR codes',
      'All available QR code types (URL, Text, Phone, Wi-Fi, Contact)',
      'Standard PNG downloads',
      'AI logo generation',
      'AI design advisor',
      'QR code history and storage',
      'Basic scan tracking',
    ],
    limits: {
      qrCodesPerMonth: -1, // unlimited
      aiRequestsPerMonth: 100,
      customColors: -1, // unlimited
      logoUpload: true,
    },
  },
  PREMIUM_YEARLY: {
    id: 'premium_yearly',
    name: 'Premium Yearly',
    price: 39.99,
    interval: 'year',
    stripePriceId: 'price_premium_yearly', // Replace with actual Stripe price ID
    features: [
      'Everything in Premium Monthly',
      '4 months free (33% savings)',
      'Early access to new features',
      'Extended QR code storage',
    ],
    limits: {
      qrCodesPerMonth: -1, // unlimited
      aiRequestsPerMonth: 100,
      customColors: -1, // unlimited
      logoUpload: true,
    },
  },
} as const;

export type PlanId = keyof typeof PLANS;
