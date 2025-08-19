'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

// Redirect to the new unified auth page
export default function LoginPage() {
  useEffect(() => {
    redirect('/auth');
  }, []);

  return null;
}
