
import type { Meta, StoryObj } from '@storybook/react';
import { AmberOpsLogo, ClearFilterIcon } from '../components/icons';

const meta: Meta = {
  title: 'Components/Icons',
  component: AmberOpsLogo,
  tags: ['autodocs'],
};

export default meta;

export const AmberOps: StoryObj<typeof AmberOpsLogo> = {
  render: () => <AmberOpsLogo className="h-16 w-16" />,
};

export const ClearFilter: StoryObj<typeof ClearFilterIcon> = {
  render: () => <ClearFilterIcon className="h-16 w-16 text-primary" />,
};
