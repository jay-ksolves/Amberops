'use client';

import Link from 'next/link';
import { FooterAnimation } from '../footer-animation';

export function Footer() {
  return (
    <footer className="relative flex w-full shrink-0 items-center gap-2 overflow-hidden border-t px-4 py-12 sm:flex-row md:px-6 min-h-[350px]">
      <div className="z-10 flex-grow">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AmberOps Inc. All rights reserved.
        </p>
        <nav className="mt-2 flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="/legal/terms-of-service"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="/legal/privacy-policy"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </div>
      <div className="absolute right-0 bottom-0 z-0">
        <FooterAnimation />
      </div>
    </footer>
  );
}
