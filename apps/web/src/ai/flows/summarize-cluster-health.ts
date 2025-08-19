'use server';
/**
 * @fileOverview A cluster health summarization AI agent.
 *
 * - summarizeClusterHealth - A function that summarizes the cluster health.
 * - SummarizeClusterHealthInput - The input type for the summarizeClusterHealth function.
 * - SummarizeClusterHealthOutput - The return type for the summarizeClusterHealth function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const SummarizeClusterHealthInputSchema = z.object({
  clusterName: z.string().describe('The name of the cluster.'),
  healthMetrics: z.string().describe('The health metrics of the cluster in JSON format.'),
  alerts: z.string().describe('The alerts of the cluster in JSON format.'),
});
export type SummarizeClusterHealthInput = z.infer<typeof SummarizeClusterHealthInputSchema>;

const SummarizeClusterHealthOutputSchema = z.object({
  summary: z.string().describe('A summary of the overall cluster health, highlighting key issues and potential risks.'),
});
export type SummarizeClusterHealthOutput = z.infer<typeof SummarizeClusterHealthOutputSchema>;

export async function summarizeClusterHealth(input: SummarizeClusterHealthInput): Promise<SummarizeClusterHealthOutput> {
  return summarizeClusterHealthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeClusterHealthPrompt',
  input: {schema: SummarizeClusterHealthInputSchema},
  output: {schema: SummarizeClusterHealthOutputSchema},
  prompt: `You are an AI expert in summarizing cluster health.

  You will use the provided cluster name, health metrics, and alerts to generate a concise summary of the overall cluster health, highlighting key issues and potential risks.

  Cluster Name: {{{clusterName}}}
  Health Metrics: {{{healthMetrics}}}
  Alerts: {{{alerts}}}

  Summary:`, // The prompt is now complete
});

const summarizeClusterHealthFlow = ai.defineFlow(
  {
    name: 'summarizeClusterHealthFlow',
    inputSchema: SummarizeClusterHealthInputSchema,
    outputSchema: SummarizeClusterHealthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
