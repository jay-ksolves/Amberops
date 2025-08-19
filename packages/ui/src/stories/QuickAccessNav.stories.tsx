
import type { Meta, StoryObj } from '@storybook/react';
import { QuickAccessNav } from '../components/quick-access-nav';

const meta: Meta<typeof QuickAccessNav> = {
  title: 'Components/QuickAccessNav',
  component: QuickAccessNav,
  decorators: [
    (Story) => (
        <div className="h-40 flex items-center justify-center">
            <Story />
        </div>
    )
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof QuickAccessNav>;

export const Default: Story = {};
