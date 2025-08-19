
'use client';

import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { Button } from '@amberops/ui/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatedThemeToggle } from '../animated-theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur-lg lg:px-6">
      <Link
        href="/"
        className="flex items-center justify-center gap-2"
        prefetch={false}
        data-testid="home-link-header"
      >
        <AmberOpsLogo className="h-8 w-8" />
        <span className="font-headline text-xl font-semibold">AmberOps</span>
      </Link>
      <nav className="ml-auto hidden items-center gap-4 sm:gap-6 md:flex">
        <Link
          href="/#features"
          className="text-sm font-medium underline-offset-4 transition-colors hover:text-primary"
          prefetch={false}
        >
          Features
        </Link>
        <Link
          href="/#pricing"
          className="text-sm font-medium underline-offset-4 transition-colors hover:text-primary"
          prefetch={false}
        >
          Pricing
        </Link>
        <Link
          href="/documentation"
          className="text-sm font-medium underline-offset-4 transition-colors hover:text-primary"
          prefetch={false}
        >
          Docs
        </Link>
        <Link
          href="/#faq"
          className="text-sm font-medium underline-offset-4 transition-colors hover:text-primary"
          prefetch={false}
        >
          FAQ
        </Link>
        <Link
          href="/#contact"
          className="text-sm font-medium underline-offset-4 transition-colors hover:text-primary"
          prefetch={false}
        >
          Contact
        </Link>
        <div className="flex items-center gap-2">
            <AnimatedThemeToggle />
            <Button asChild variant="ghost" data-testid="login-button-header">
              <Link href="/auth">Login</Link>
            </Button>
            <Button asChild data-testid="get-started-button-header">
              <Link href="/auth?action=signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </div>
      </nav>
       <div className="ml-auto flex items-center gap-2 md:hidden">
            <AnimatedThemeToggle />
            <Button asChild variant="outline">
              <Link href="/auth">Login</Link>
            </Button>
      </div>
    </header>
  );
}
