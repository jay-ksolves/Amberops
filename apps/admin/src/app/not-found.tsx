
'use client';

import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { Button } from '@amberops/ui/components/ui/button';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center rounded-lg border bg-card p-4 text-center shadow-sm">
       <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
      <h2 className="text-6xl font-bold font-headline text-destructive">404</h2>
      <p className="mt-4 text-2xl font-semibold text-foreground">Page Not Found</p>
      <p className="mt-2 text-muted-foreground">
        The page you are trying to access does not exist in the Admin Console.
      </p>
      <Button asChild className="mt-8">
        <Link href="/dashboard">Return to Admin Dashboard</Link>
      </Button>
    </div>
  );
}
