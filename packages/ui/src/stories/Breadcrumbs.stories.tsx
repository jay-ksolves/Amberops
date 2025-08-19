
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../components/breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/clusters/prod-cluster-1',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: (args) => <Breadcrumbs {...args} />,
};
