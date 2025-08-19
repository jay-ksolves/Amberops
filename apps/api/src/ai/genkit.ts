
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Note: To use this in a serverless environment (like Vercel Serverless Functions),
// you MUST ensure the API key is available as an environment variable at runtime.
// In Vercel, this is done by adding it to the project's Environment Variables settings.
export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
  model: 'googleai/gemini-2.0-flash',
});
