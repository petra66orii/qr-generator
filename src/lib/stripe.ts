// lib/stripe.ts
import Stripe from 'stripe';

// Server-side Stripe instance - handle missing key during build
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-07-30.basil',
      typescript: true,
    })
  : null;

// Re-export plans for server-side use
export { PLANS, type PlanId } from './plans';
