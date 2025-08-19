
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/ui/slider';
import { cn } from '../lib/utils';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <Slider
      {...args}
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn('w-[60%]', args.className)}
    />
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Slider
      {...args}
      defaultValue={[50]}
      max={100}
      step={1}
      disabled
      className={cn('w-[60%]', args.className)}
    />
  ),
};
