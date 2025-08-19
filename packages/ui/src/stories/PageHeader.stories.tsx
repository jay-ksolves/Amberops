import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '../components/page-header';
import { Button } from '../components/ui/button';
import { PlusCircle } from 'lucide-react';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
    description: 'Welcome to your AmberOps Console.',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Clusters',
    description: 'Manage your clusters and view their health status.',
    actions: (
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Cluster
      </Button>
    ),
  },
};
