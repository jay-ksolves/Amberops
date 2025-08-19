
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Breadcrumbs } from '@amberops/ui/components/breadcrumbs';
import { Preloader } from '@amberops/ui/components/preloader';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { log } from '@amberops/lib';
import * as jose from 'jose';

export default function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    log('[Web Layout] Running auth check effect...');
    
    // First, check for a token in the URL for session handoff
    const token = searchParams.get('token');
    if (token) {
        try {
            const user = jose.decodeJwt(token);
            log('[Web Layout] Token found in URL, storing user and token...');
            localStorage.setItem('amberops_user', JSON.stringify(user));
            localStorage.setItem('amberops_jwt', token); // Store the token
            setIsAuthorized(true);
            
            // Clean the token from the URL
            const currentPath = window.location.pathname;
            router.replace(currentPath, { scroll: false });
             setIsChecking(false);
            return;

        } catch(e) {
            console.error("Failed to decode token from URL", e);
            toast.error("Invalid authentication session token.");
            setIsAuthorized(false);
        }
    }

    // If no token in URL, check if the user is already authenticated in localStorage
    const userStr = localStorage.getItem('amberops_user');
    const jwt = localStorage.getItem('amberops_jwt');
    if (userStr && jwt) {
      log('[Web Layout] User and JWT found in localStorage.');
      setIsAuthorized(true);
    } else {
        log('[Web Layout] No user/JWT in localStorage and no token in URL.');
        setIsAuthorized(false);
    }
    
    setIsChecking(false);
  }, [router, searchParams]);

  useEffect(() => {
    if (isChecking) return;

    if (!isAuthorized) {
        log('[Web Layout] User not authorized. Redirecting to login.');
        toast.error('Authentication required. Please log in.');
        const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
        window.location.href = `${homeUrl}/auth`;
    }
  }, [isChecking, isAuthorized]);

  if (isChecking || !isAuthorized) {
    return <Preloader text="Verifying session..." />;
  }
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarNav />
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
