// app/api/stripe/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe, PLANS } from '@/lib/stripe';
import { auth } from '@/lib/firebase';
import { UserService } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 503 }
      );
    }

    const { planId, userId } = await request.json();

    if (!planId || !userId) {
      return NextResponse.json(
        { error: 'Missing planId or userId' },
        { status: 400 }
      );
    }

    const plan = PLANS[planId as keyof typeof PLANS];
    if (
      !plan ||
      planId === 'FREE' ||
      !('stripePriceId' in plan) ||
      !plan.stripePriceId
    ) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Get user profile to check if they already have a Stripe customer ID
    const userProfile = await UserService.getById(userId);
    let customerId = userProfile?.subscription?.stripeCustomerId;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: {
          firebaseUid: userId,
        },
      });
      customerId = customer.id;

      // Update user profile with Stripe customer ID
      await UserService.updateSubscription(userId, {
        ...userProfile?.subscription,
        stripeCustomerId: customerId,
        plan: 'free',
        status: 'active',
      });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: (plan as any).stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/subscribe?canceled=true`,
      metadata: {
        firebaseUid: userId,
        planId: planId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
