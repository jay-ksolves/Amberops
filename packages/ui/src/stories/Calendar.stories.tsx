
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Calendar } from '../components/ui/calendar';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar {...args} mode="single" selected={date} onSelect={setDate} className="rounded-md border" />;
  },
};
