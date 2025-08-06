// lib/stripe-client.ts
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';

// Client-side Stripe instance
let stripePromise: Promise<StripeJS | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.warn('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};
