
import type { Meta, StoryObj } from '@storybook/react';
import { Preloader } from '../components/preloader';

const meta: Meta<typeof Preloader> = {
  title: 'Components/Preloader',
  component: Preloader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Preloader>;

export const Default: Story = {
  args: {
    text: 'Loading application...',
  },
};

export const WithCountdown: Story = {
  args: {
    text: 'Redirecting',
    countdown: 5,
  },
};
