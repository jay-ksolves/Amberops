'use server';

/**
 * This file re-exports the AI flows as Server Actions.
 * This allows client components to call them without bundling the
 * server-side AI code into the client bundle.
 */

import {
  suggestTroubleshootingSteps as suggestTroubleshootingStepsFlow,
  summarizeClusterHealth as summarizeClusterHealthFlow,
  type SuggestTroubleshootingStepsInput,
  type SuggestTroubleshootingStepsOutput,
  type SummarizeClusterHealthInput,
  type SummarizeClusterHealthOutput,
} from '@amberops/api/ai';

export async function suggestTroubleshootingSteps(
  input: SuggestTroubleshootingStepsInput,
): Promise<SuggestTroubleshootingStepsOutput> {
  return suggestTroubleshootingStepsFlow(input);
}

export async function summarizeClusterHealth(
  input: SummarizeClusterHealthInput,
): Promise<SummarizeClusterHealthOutput> {
  return summarizeClusterHealthFlow(input);
}
