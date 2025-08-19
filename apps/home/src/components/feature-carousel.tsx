'use client';

import { cn } from '@amberops/lib';
import { Button } from '@amberops/ui/components/ui/button';
import { BarChart, HardDrive, Server, Zap } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: Zap,
    title: 'Blazing Fast UI',
    description:
      'A modern, responsive interface built with Next.js for a seamless user experience that leaves legacy systems behind.',
    details: ['98% faster page loads', 'Real-time updates'],
    buttonText: 'Experience the Speed',
  },
  {
    icon: BarChart,
    title: 'AI-Powered Insights',
    description:
      'Leverage generative AI to get health summaries and actionable troubleshooting steps in plain English.',
    details: ['Automated health summaries', 'Step-by-step repair guides'],
    buttonText: 'Explore AI Features',
  },
  {
    icon: Server,
    title: 'Unified Cluster View',
    description:
      'Manage all your clusters from a single, intuitive dashboard. No more context switching.',
    details: ['Multi-cluster support', 'Global search functionality'],
    buttonText: 'Unify Your View',
  },
  {
    icon: HardDrive,
    title: 'Simplified Service Mgmt',
    description:
      'Start, stop, and configure services across all hosts with just a few clicks. Track operations in real-time.',
    details: ['One-click service actions', 'Live task tracking'],
    buttonText: 'Manage Services',
  },
];

export function FeatureCarousel() {
  const [activeCardId, setActiveCardId] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigateToCard = (cardId: number) => {
    setActiveCardId(cardId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardId((prev) => (prev % features.length) + 1);
    }, 5000); // Auto-cycle every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-12 lg:flex-row">
      <div className="max-w-lg flex-1">
        <div className="mb-6 flex items-center gap-2 text-muted-foreground">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-medium uppercase tracking-wide">
            Core AmberOps Features
          </span>
        </div>
        <h2 className="font-headline mb-6 text-3xl font-bold tracking-tighter sm:text-4xl">
          Powerful Tools, Simplified.
        </h2>
        <p className="mb-8 text-base text-muted-foreground">
          Drag the cards to explore our technology solutions and discover how
          we&apos;re building innovative platforms for modern data operations.
        </p>

        <div className="mb-8 flex gap-3">
          {features.map((_, index) => (
            <button
              key={index}
              id={`dot-${index + 1}`}
              onClick={() => navigateToCard(index + 1)}
              className={cn(
                'h-2 w-2 rounded-full bg-muted-foreground/50 transition-all hover:bg-foreground/80',
                activeCardId === index + 1 && 'scale-150 bg-primary',
              )}
              aria-label={`Go to feature ${index + 1}`}
              type="button"
            />
          ))}
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center gap-3 transition-opacity',
                activeCardId === index + 1 ? 'opacity-100' : 'opacity-50',
              )}
            >
              <div
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-colors',
                  activeCardId === index + 1
                    ? 'bg-primary'
                    : 'bg-muted-foreground/50',
                )}
              />
              <span
                className={cn(
                  activeCardId === index + 1 && 'text-foreground',
                )}
              >
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <section
        id="cards-container"
        ref={containerRef}
        className={`card-${activeCardId}-active`}
      >
        {features.map((feature, index) => (
          <article key={index} className="glass rounded-2xl shadow-2xl">
            <div className="flex h-full flex-col p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full border border-primary/20 bg-primary/10 p-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {feature.title}
                </span>
              </div>

              <p className="mb-6 flex-1 text-foreground/80">
                {feature.description}
              </p>

              <div className="mb-6 flex items-center gap-4 text-sm">
                {feature.details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                    <span className="text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>

              <Button className="glass-button w-full">
                {feature.buttonText}
              </Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
