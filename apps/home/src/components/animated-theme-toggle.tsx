'use client';

import { cn } from '@amberops/lib';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function AnimatedThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="relative z-50 flex h-[20px] w-[20px] scale-[1.5] items-center justify-center rounded-lg bg-secondary"
        disabled
      />
    );
  }

  const toggleTheme = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    // The animation duration is 500ms in the CSS
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      setIsAnimating(false);
    }, 500);
  };

  return (
    <>
      <div
        id="bg-mask"
        className={cn(
          'bg-mask',
          isAnimating && 'animate-background-spread',
        )}
        style={{
          backgroundColor:
            theme === 'dark'
              ? 'hsl(var(--background))'
              : 'hsl(var(--foreground))',
        }}
        onAnimationEnd={() => setIsAnimating(false)}
      />
      <button
        id="darkmode-btn"
        type="button"
        onClick={toggleTheme}
        className="relative z-50 flex h-[20px] w-[20px] scale-[1.5] items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-transform duration-300 hover:scale-[1.6] active:scale-[1.4]"
        aria-label="Toggle theme"
        disabled={isAnimating}
      >
        {theme === 'dark' ? (
          <Moon className="h-6 w-6" />
        ) : (
          <Sun className="h-6 w-6" />
        )}
      </button>
    </>
  );
}
