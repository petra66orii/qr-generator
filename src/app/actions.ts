'use server';

import {
  qrCodeDesignAdvisor,
  type QrCodeDesignAdvisorInput,
  type QrCodeDesignAdvisorOutput,
} from '@/ai/flows/qr-code-design-advisor';

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
