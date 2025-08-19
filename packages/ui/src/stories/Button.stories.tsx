import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button';
import { PlusCircle } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Cancel',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Action',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Learn More',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Go to Settings',
    variant: 'link',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    children: <PlusCircle />,
    size: 'icon',
  },
};
