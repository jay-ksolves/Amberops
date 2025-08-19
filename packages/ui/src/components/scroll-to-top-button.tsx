
'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@amberops/ui/components/ui/button';
import { cn } from '@amberops/lib';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (totalScroll > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if (windowHeight > 0) {
      const progress = (totalScroll / windowHeight) * 100;
      setScrollProgress(progress);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={cn(
        'fixed bottom-8 right-8 z-50 h-14 w-14 transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="3"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 24 24)"
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <Button
        size="icon"
        className="h-full w-full rounded-full shadow-lg"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-testid="scroll-to-top-button"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
}
