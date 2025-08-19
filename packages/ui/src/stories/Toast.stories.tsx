import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button';
import { Toaster } from '../components/ui/toaster';
import { useToast } from '../hooks/use-toast';

const meta: Meta = {
  title: 'UI/Toast',
  component: Button,
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
};

export const Destructive: StoryObj = {
    render: () => {
    const { toast } = useToast();
    return (
      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          })
        }}
      >
        Show Destructive Toast
      </Button>
    )
  },
}
