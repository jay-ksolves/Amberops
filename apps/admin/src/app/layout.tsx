
'use client';

import '@amberops/design-tokens/globals.css';
import { cn, log } from '@amberops/lib';
import { ThemeProvider } from '@amberops/ui';
import { Breadcrumbs } from '@amberops/ui/components/breadcrumbs';
import { Preloader } from '@amberops/ui/components/preloader';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter, Space_Grotesk } from 'next/font/google';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as jose from 'jose';
import { AdminSidebarNav } from '../components/layout/admin-sidebar-nav';
import { AppLayout } from '../components/layout/app-layout';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const queryClient = new QueryClient();

function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    log('[Admin Layout] Running auth check effect...');

    const token = searchParams.get('token');
    if (token) {
      try {
        const user = jose.decodeJwt(token);
        if ((user as any).role !== 'Admin') {
          throw new Error('User is not an administrator.');
        }
        log('[Admin Layout] Admin token found in URL, storing user and token...');
        localStorage.setItem('amberops_user', JSON.stringify(user));
        localStorage.setItem('amberops_jwt', token);
        setIsAuthorized(true);

        const currentPath = window.location.pathname;
        router.replace(currentPath, { scroll: false });
        setIsChecking(false);
        return;
      } catch (e: any) {
        console.error('Failed to process admin token from URL', e);
        toast.error(e.message || 'Invalid authentication session token.');
        const webUrl =
          process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';
        window.location.href = webUrl;
        return;
      }
    }

    const userStr = localStorage.getItem('amberops_user');
    const jwt = localStorage.getItem('amberops_jwt'); // Check for the token as well
    if (userStr && jwt) {
      const user = JSON.parse(userStr);
      if (user.role === 'Admin') {
        log('[Admin Layout] Admin user and JWT found in localStorage.');
        setIsAuthorized(true);
      } else {
        log('[Admin Layout] Non-admin user found. Redirecting...');
        toast.error('Access denied. You are not an administrator.');
        const webUrl =
          process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';
        window.location.href = webUrl;
        return;
      }
    } else {
      log('[Admin Layout] No user/JWT in localStorage and no token in URL.');
      setIsAuthorized(false);
    }

    setIsChecking(false);
  }, [router, searchParams]);

  useEffect(() => {
    if (isChecking) return;

    if (!isAuthorized) {
      log('[Admin Layout] User not authorized. Redirecting to login.');
      toast.error('Authentication required. Please log in.');
      const homeUrl =
        process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
      window.location.href = `${homeUrl}/auth`;
    }
  }, [isChecking, isAuthorized]);

  if (isChecking || !isAuthorized) {
    return <Preloader text="Verifying administrator access..." />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebarNav />
        <div className="flex flex-1 flex-col">
          <AppLayout>
            <Breadcrumbs />
            {children}
          </AppLayout>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AdminClientLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Preloader />;
    }
    
    return (
        <AdminProtectedLayout>{children}</AdminProtectedLayout>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable,
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <AdminClientLayout>{children}</AdminClientLayout>
                <Toaster position="bottom-right" />
            </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
