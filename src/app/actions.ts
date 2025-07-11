'use server';

import {
  qrCodeDesignAdvisor,
  type QrCodeDesignAdvisorInput,
  type QrCodeDesignAdvisorOutput,
} from '@/ai/flows/qr-code-design-advisor';
import { generateLogo } from '@/ai/flows/logo-generator';

export async function getQrCodeAdvice(
  input: QrCodeDesignAdvisorInput
): Promise<QrCodeDesignAdvisorOutput> {
  try {
    const result = await qrCodeDesignAdvisor(input);
    return result;
  } catch (error) {
    console.error('Error getting QR code advice:', error);
    throw new Error('Failed to get AI-powered design advice. Please try again.');
  }
}

export async function getLogo(prompt: string): Promise<string> {
  try {
    const result = await generateLogo({ prompt });
    return result;
  } catch (error) {
    console.error('Error generating logo:', error);
    throw new Error('Failed to generate logo. Please try again.');
  }
}
