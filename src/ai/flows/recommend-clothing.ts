// noinspection ES6UnusedImports
'use server';

/**
 * @fileOverview A clothing recommendation AI agent based on body structure.
 *
 * - recommendClothing - A function that handles the clothing recommendation process.
 * - RecommendClothingInput - The input type for the recommendClothing function.
 * - RecommendClothingOutput - The return type for the recommendClothing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendClothingInputSchema = z.object({
  height: z.number().describe('The height of the user in centimeters.'),
  weight: z.number().describe('The weight of the user in kilograms.'),
  desiredClothing: z.string().describe('The type of clothing the user is looking for (e.g., shirt, pants, dress).'),
  stylePreferences: z.string().describe('The user\'s style preferences (e.g., casual, formal, sporty).'),
});
export type RecommendClothingInput = z.infer<typeof RecommendClothingInputSchema>;

const RecommendClothingOutputSchema = z.object({
  recommendation: z.string().describe('A detailed clothing recommendation based on the user\'s body structure and preferences.'),
  reasoning: z.string().describe('The reasoning behind the recommendation, explaining why the suggested clothing would be a good fit.'),
});
export type RecommendClothingOutput = z.infer<typeof RecommendClothingOutputSchema>;

export async function recommendClothing(input: RecommendClothingInput): Promise<RecommendClothingOutput> {
  return recommendClothingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendClothingPrompt',
  input: {schema: RecommendClothingInputSchema},
  output: {schema: RecommendClothingOutputSchema},
  prompt: `You are a personal stylist AI assistant specializing in providing clothing recommendations based on body structure.

You will use the user's height, weight, desired clothing type, and style preferences to generate a detailed clothing recommendation. The recommendation should include specific details about the clothing item and why it would be a good fit for the user.

Height: {{{height}}} cm
Weight: {{{weight}}} kg
Desired Clothing: {{{desiredClothing}}}
Style Preferences: {{{stylePreferences}}}

Consider the user's body structure when making the recommendation. For example, suggest clothing that complements their body shape and proportions.

Explain your reasoning for the recommendation in the reasoning field.
`,
});

const recommendClothingFlow = ai.defineFlow(
  {
    name: 'recommendClothingFlow',
    inputSchema: RecommendClothingInputSchema,
    outputSchema: RecommendClothingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
