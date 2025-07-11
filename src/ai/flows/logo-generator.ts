'use server';
/**
 * @fileOverview A logo generator AI agent.
 *
 * - generateLogo - A function that handles logo generation.
 * - GenerateLogoInput - The input type for the generateLogo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLogoInputSchema = z.object({
  prompt: z.string().describe('A text description of the desired logo.'),
});
export type GenerateLogoInput = z.infer<typeof GenerateLogoInputSchema>;

export async function generateLogo(input: GenerateLogoInput): Promise<string> {
  return generateLogoFlow(input);
}

const generateLogoFlow = ai.defineFlow(
  {
    name: 'generateLogoFlow',
    inputSchema: GenerateLogoInputSchema,
    outputSchema: z.string(),
  },
  async ({ prompt }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a simple, modern, flat, single-color SVG logo on a transparent background for: ${prompt}. The logo should be iconic and work well inside a small circle.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed to produce a result.');
    }
    return media.url;
  }
);
