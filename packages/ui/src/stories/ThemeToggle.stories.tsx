import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from '../components/theme-toggle';
import { ThemeProvider } from '../components/theme-provider';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
        <ThemeProvider>
            <Story />
        </ThemeProvider>
    )
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};
