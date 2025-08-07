// app/api/stripe/webhooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { UserService } from '@/lib/database';
import { headers } from 'next/headers';
import { Timestamp } from 'firebase/firestore';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  // Check if Stripe is configured
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.log('Stripe or webhook secret not configured, skipping webhook processing');
    return NextResponse.json(
      { message: 'Webhook processing disabled - Stripe not fully configured' },
      { status: 200 }
    );
  }

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const firebaseUid = session.metadata?.firebaseUid;
  const planId = session.metadata?.planId;

  if (!firebaseUid || !planId) {
    console.error('Missing metadata in checkout session');
    return;
  }

  // Get the subscription
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  // Update user's subscription in database
  await UserService.updateSubscription(firebaseUid, {
    plan: planId as 'free' | 'premium',
    status: 'active',
    stripeCustomerId: session.customer as string,
    stripeSubscriptionId: subscription.id,
    currentPeriodEnd: Timestamp.fromDate(new Date((subscription as any).current_period_end * 1000)),
  });

  console.log(`Subscription activated for user ${firebaseUid}`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  
  if ('deleted' in customer) return;

  const firebaseUid = customer.metadata?.firebaseUid;
  if (!firebaseUid) return;

  const status = subscription.status;
  let planStatus: 'active' | 'cancelled' | 'expired';

  switch (status) {
    case 'active':
    case 'trialing':
      planStatus = 'active';
      break;
    case 'canceled':
    case 'unpaid':
      planStatus = 'cancelled';
      break;
    case 'past_due':
    case 'incomplete':
    case 'incomplete_expired':
      planStatus = 'expired';
      break;
    default:
      planStatus = 'expired';
  }

  await UserService.updateSubscription(firebaseUid, {
    plan: planStatus === 'active' ? 'premium' : 'free',
    status: planStatus,
    stripeCustomerId: subscription.customer as string,
    stripeSubscriptionId: subscription.id,
    currentPeriodEnd: Timestamp.fromDate(new Date((subscription as any).current_period_end * 1000)),
  });

  console.log(`Subscription updated for user ${firebaseUid}: ${planStatus}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  
  if ('deleted' in customer) return;

  const firebaseUid = customer.metadata?.firebaseUid;
  if (!firebaseUid) return;

  await UserService.updateSubscription(firebaseUid, {
    plan: 'free',
    status: 'cancelled',
    stripeCustomerId: subscription.customer as string,
    stripeSubscriptionId: subscription.id,
  });

  console.log(`Subscription cancelled for user ${firebaseUid}`);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // Payment succeeded - subscription should remain active
  // This is handled by subscription.updated event
  console.log(`Payment succeeded for invoice ${invoice.id}`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Payment failed - might want to send notification
  console.log(`Payment failed for invoice ${invoice.id}`);
}
