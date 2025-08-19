import type { Config } from 'tailwindcss';
import sharedConfig from '@amberops/design-tokens/tailwind.config';

const config: Config = {
  presets: [sharedConfig],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
export default config;
