'use server';

import {
  qrCodeDesignAdvisor,
  type QrCodeDesignAdvisorInput,
  type QrCodeDesignAdvisorOutput,
} from '@/ai/flows/qr-code-design-advisor';
import { generateLogo } from '@/ai/flows/logo-generator';
import { getCurrentUser, getServerUserProfile } from '@/lib/auth-server';

export async function getQrCodeAdvice(
  input: QrCodeDesignAdvisorInput
): Promise<QrCodeDesignAdvisorOutput> {
  try {
    // 1. Verify User Identity
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Unauthorized: Please sign in.');
    }

    // 2. Verify Subscription Status
    const userProfile = await getServerUserProfile(user.uid);
    const plan = userProfile?.subscription?.plan;
    const status = userProfile?.subscription?.status;

    // Allow if plan is premium/active OR allows AI usage (adjust logic to your needs)
    const isPremium = plan === 'premium' || (plan as string) === 'premium_monthly' || (plan as string) === 'premium_yearly';
    const isActive = status === 'active' || (status as string) === 'trialing';

    if (!isPremium || !isActive) {
       throw new Error('Premium subscription required for AI features.');
    }

    const result = await qrCodeDesignAdvisor(input);
    return result;
  } catch (error) {
    console.error('Error getting QR code advice:', error);
    // Pass specific error messages to client
    if (error instanceof Error) {
        throw new Error(error.message); // Preserve "Unauthorized" message
    }
    throw new Error('Failed to get AI-powered design advice. Please try again.');
  }
}

export async function getLogo(prompt: string): Promise<string> {
  try {
    // 1. Verify User Identity
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Unauthorized: Please sign in.');
    }

    // 2. Verify Subscription Status
    const userProfile = await getServerUserProfile(user.uid);
    const plan = userProfile?.subscription?.plan;
    const status = userProfile?.subscription?.status;

    const isPremium = plan === 'premium' || (plan as string) === 'premium_monthly' || (plan as string) === 'premium_yearly';
    const isActive = status === 'active' || (status as string) === 'trialing';

    if (!isPremium || !isActive) {
        throw new Error('Premium subscription required for AI logo generation.');
    }

    const result = await generateLogo({ prompt });
    return result;
  } catch (error) {
    console.error('Error generating logo:', error);
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('Failed to generate logo. Please try again.');
  }
}