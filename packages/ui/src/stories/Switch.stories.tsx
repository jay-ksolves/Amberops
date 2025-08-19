import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    id: 'airplane-mode',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <Label htmlFor={args.id}>Airplane Mode</Label>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    id: 'disabled-mode',
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <Label htmlFor={args.id}>Disabled</Label>
    </div>
  ),
};
