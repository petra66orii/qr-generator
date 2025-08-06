// lib/stripe.ts
import Stripe from 'stripe';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
  typescript: true,
});

// Re-export plans for server-side use
export { PLANS, type PlanId } from './plans';
