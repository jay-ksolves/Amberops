import type { Meta, StoryObj } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '../../../../apps/web/src/lib/i18n';
import { LanguageSwitcher } from '../components/language-switcher';

const queryClient = new QueryClient();

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </I18nextProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {};
