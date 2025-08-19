
'use client';

import { useEffect } from 'react';
import { Preloader } from '@amberops/ui/components/preloader';

// This page is a placeholder to demonstrate the redirect flow.
export default function LoginPage() {
  useEffect(() => {
    // Redirect to the actual login page hosted on the 'home' app.
    const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
    window.location.href = `${homeUrl}/auth`;
  }, []);

  return <Preloader />;
}
