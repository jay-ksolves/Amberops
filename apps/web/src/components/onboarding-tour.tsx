
'use client';

import React from 'react';
import Joyride, { type Step, type CallBackProps } from 'react-joyride';
import { useTheme } from 'next-themes';

interface OnboardingTourProps {
  run: boolean;
  setRun: (run: boolean) => void;
}

export function OnboardingTour({ run, setRun }: OnboardingTourProps) {
  const { theme } = useTheme();

  const steps: Step[] = [
    {
      target: '.page-header',
      content: 'Welcome to AmberOps! This is your main dashboard, giving you a high-level overview of your infrastructure.',
      placement: 'bottom',
      title: 'Welcome!',
    },
    {
      target: '#summary-cards',
      content: 'These cards provide at-a-glance metrics for your entire system, like total clusters and active alerts.',
      placement: 'bottom',
      title: 'Summary Cards',
    },
    {
      target: '#cluster-status-card',
      content: 'Here you can see the status of all your clusters. Click on a cluster name to see more details.',
      placement: 'right',
      title: 'Cluster Status',
    },
    {
      target: '#ai-summary-card',
      content: 'Our AI can provide a health summary for any cluster. Just select one from the dropdown.',
      placement: 'top',
      title: 'AI Health Summary',
    },
    {
      target: '.quick-nav-container',
      content: 'Use the Quick Access menu to jump to any page or perform common actions instantly.',
      placement: 'left',
      title: 'Quick Access',
    },
    {
      target: '[data-sidebar="sidebar"]',
      content: 'Use the sidebar to navigate to all major sections of the application.',
      placement: 'right',
      title: 'Main Navigation',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (['finished', 'skipped'].includes(status)) {
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: theme === 'dark' ? '#0f172a' : '#ffffff',
          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
          primaryColor: '#f97316',
          textColor: theme === 'dark' ? '#f8fafc' : '#020617',
          zIndex: 10000,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          borderRadius: '0.375rem',
        },
        buttonBack: {
            borderRadius: '0.375rem',
            marginRight: 'auto',
        },
        buttonSkip: {
            borderRadius: '0.375rem',
        }
      }}
    />
  );
}
