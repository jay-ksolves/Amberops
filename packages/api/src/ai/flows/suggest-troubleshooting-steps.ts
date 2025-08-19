'use server';

/**
 * @fileOverview An AI agent that suggests troubleshooting steps for alerts based on alert descriptions and related logs.
 *
 * - suggestTroubleshootingSteps - A function that suggests troubleshooting steps for a given alert.
 * - SuggestTroubleshootingStepsInput - The input type for the suggestTroubleshootingSteps function.
 * - SuggestTroubleshootingStepsOutput - The return type for the suggestTroubleshootingSteps function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const SuggestTroubleshootingStepsInputSchema = z.object({
  alertDescription: z.string().describe('The description of the alert.'),
  relatedLogs: z.string().describe('The related logs for the alert.'),
});
export type SuggestTroubleshootingStepsInput = z.infer<typeof SuggestTroubleshootingStepsInputSchema>;

const SuggestTroubleshootingStepsOutputSchema = z.object({
  suggestedSteps: z.array(z.string()).describe('The suggested troubleshooting steps for the alert.'),
});
export type SuggestTroubleshootingStepsOutput = z.infer<typeof SuggestTroubleshootingStepsOutputSchema>;

export async function suggestTroubleshootingSteps(input: SuggestTroubleshootingStepsInput): Promise<SuggestTroubleshootingStepsOutput> {
  return suggestTroubleshootingStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTroubleshootingStepsPrompt',
  input: {schema: SuggestTroubleshootingStepsInputSchema},
  output: {schema: SuggestTroubleshootingStepsOutputSchema},
  prompt: `You are an expert system administrator. You will suggest troubleshooting steps for alerts based on alert descriptions and related logs.

Alert Description: {{{alertDescription}}}
Related Logs: {{{relatedLogs}}}

Suggest the troubleshooting steps in a numbered list. Each step should be concise and actionable.
`,
});

const suggestTroubleshootingStepsFlow = ai.defineFlow(
  {
    name: 'suggestTroubleshootingStepsFlow',
    inputSchema: SuggestTroubleshootingStepsInputSchema,
    outputSchema: SuggestTroubleshootingStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
