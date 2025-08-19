import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const meta: Meta<typeof Avatar> = {
    title: 'UI/Avatar',
    component: Avatar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarImage src="https://avatar.vercel.sh/random" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
    ),
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://non-existent-image-url.jpg" alt="User Avatar" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};
