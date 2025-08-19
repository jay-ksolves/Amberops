'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

// Redirect to the new unified auth page
export default function SignupPage() {
  useEffect(() => {
    redirect('/auth?action=signup');
  }, []);

  return null;
}
