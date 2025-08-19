
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@amberops/lib';

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0 || segments[0] === 'dashboard') {
    return null;
  }

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    // Capitalize and replace hyphens
    const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

    return { href, title, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/dashboard" className="flex items-center gap-1.5 hover:text-foreground">
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {breadcrumbs.map(({ href, title, isLast }) => (
        <React.Fragment key={href}>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={href}
            className={cn(
              'truncate',
              isLast ? 'font-medium text-foreground' : 'hover:text-foreground'
            )}
            aria-current={isLast ? 'page' : undefined}
          >
            {title}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
