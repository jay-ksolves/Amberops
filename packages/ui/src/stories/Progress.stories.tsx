import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../components/ui/progress';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 33,
    className: 'w-[60%]',
  },
};

export const Loading: Story = {
  args: {
    value: 66,
     className: 'w-[60%]',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
     className: 'w-[60%]',
  },
};
