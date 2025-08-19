import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: 'terms',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor={args.id}>Accept terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
    args: {
        id: 'checked',
        checked: true,
    },
    render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor={args.id}>Checked by default</Label>
    </div>
  ),
};


export const Disabled: Story = {
  args: {
    id: 'disabled',
    disabled: true,
  },
   render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor={args.id}>Disabled checkbox</Label>
    </div>
  ),
};
