
'use client';

import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { Button } from '@amberops/ui/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex items-center gap-4 mb-8">
        <AmberOpsLogo className="h-12 w-12 text-primary" />
        <h1 className="font-headline text-3xl font-semibold text-foreground">AmberOps</h1>
      </div>
      <h2 className="text-8xl font-bold font-headline text-primary">404</h2>
      <p className="mt-4 text-2xl font-semibold text-foreground">Page Not Found</p>
      <p className="mt-2 text-muted-foreground">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
