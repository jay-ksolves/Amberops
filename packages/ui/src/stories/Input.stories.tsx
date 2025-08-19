import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Search } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input {...args} id="email" />
    </div>
  ),
  args: {
    placeholder: 'Email',
    type: 'email',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input {...args} className="pl-8" />
    </div>
  ),
  args: {
    placeholder: 'Search...',
    type: 'text',
  },
};


export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};
