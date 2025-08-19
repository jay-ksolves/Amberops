import type { Preview, Decorator } from '@storybook/react';
import '@amberops/design-tokens/globals.css';
import React from 'react';
import { ThemeProvider } from '../components/theme-provider';

const withRootLayout: Decorator = (Story) => {
  const style: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    '--font-body': 'Inter, sans-serif',
    '--font-headline': "'Space Grotesk', sans-serif",
  };

  return (
    <div style={style} className="p-4 bg-background">
        <Story />
    </div>
  );
};

const withThemeProvider: Decorator = (Story, context) => {
    const { theme } = context.globals;
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <div data-theme={theme}>
                <Story />
            </div>
        </ThemeProvider>
    )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withRootLayout, withThemeProvider],
};

export default preview;
