
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import Link from 'next/link';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 flex items-center justify-center bg-muted/40 p-10">
        {children}
      </div>
      <div className="hidden lg:flex flex-1 bg-primary text-primary-foreground flex-col items-center justify-center p-10">
         <Link href="/" className="flex items-center justify-center gap-3 mb-8">
            <AmberOpsLogo className="h-16 w-16 text-primary-foreground" />
            <h1 className="text-5xl font-bold font-headline">AmberOps</h1>
        </Link>
        <p className="text-center text-lg max-w-md">
            The modern, fast, and intuitive frontend for Apache Ambari, supercharged with AI-powered insights.
        </p>
      </div>
    </div>
  )
}

    