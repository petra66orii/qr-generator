'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing QR code design advice.
 *
 * - qrCodeDesignAdvisor - A function that provides design advice for QR codes.
 * - QrCodeDesignAdvisorInput - The input type for the qrCodeDesignAdvisor function.
 * - QrCodeDesignAdvisorOutput - The return type for the qrCodeDesignAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QrCodeDesignAdvisorInputSchema = z.object({
  data: z.string().describe('The data to be encoded in the QR code (e.g., URL, text).'),
  useCase: z.string().describe('The intended use case for the QR code (e.g., business card, website link, event promotion).'),
  size: z.string().optional().describe('The desired size of the QR code (e.g., small, medium, large).'),
  color: z.string().optional().describe('The desired color of the QR code (e.g., black, white, custom hex code).'),
  style: z.string().optional().describe('The desired style of the QR code (e.g., standard, inverse, with logo).'),
});
export type QrCodeDesignAdvisorInput = z.infer<typeof QrCodeDesignAdvisorInputSchema>;

const QrCodeDesignAdvisorOutputSchema = z.object({
  sizeRecommendation: z.string().describe('Recommendation for the optimal size of the QR code.'),
  colorRecommendation: z.string().describe('Recommendation for the optimal color scheme of the QR code.'),
  styleRecommendation: z.string().describe('Recommendation for the optimal style of the QR code, considering readability and scannability.'),
  additionalTips: z.string().optional().describe('Additional tips for improving the QR code design.'),
});
export type QrCodeDesignAdvisorOutput = z.infer<typeof QrCodeDesignAdvisorOutputSchema>;

export async function qrCodeDesignAdvisor(input: QrCodeDesignAdvisorInput): Promise<QrCodeDesignAdvisorOutput> {
  return qrCodeDesignAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'qrCodeDesignAdvisorPrompt',
  input: {schema: QrCodeDesignAdvisorInputSchema},
  output: {schema: QrCodeDesignAdvisorOutputSchema},
  prompt: `You are an expert QR code design advisor. Based on the user's input data, use case, and desired customizations, provide recommendations for the optimal size, color, and style of the QR code to ensure readability and scannability.

Data: {{{data}}}
Use Case: {{{useCase}}}
Size: {{{size}}}
Color: {{{color}}}
Style: {{{style}}}

Consider the following factors when making your recommendations:
* Readability: The QR code should be easily readable by a variety of scanning devices.
* Scannability: The QR code should be scannable in a variety of lighting conditions and from different distances.
* Use Case: The design should be appropriate for the intended use case.
* Style: Balance aesthetics with functionality, ensuring the design enhances rather than detracts from scannability.

Output:
Size Recommendation: {sizeRecommendation}
Color Recommendation: {colorRecommendation}
Style Recommendation: {styleRecommendation}
Additional Tips: {additionalTips}
`,
});

const qrCodeDesignAdvisorFlow = ai.defineFlow(
  {
    name: 'qrCodeDesignAdvisorFlow',
    inputSchema: QrCodeDesignAdvisorInputSchema,
    outputSchema: QrCodeDesignAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
