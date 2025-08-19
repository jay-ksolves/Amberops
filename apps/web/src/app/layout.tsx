
'use client';

import { Inter, Space_Grotesk } from 'next/font/google';
import '@amberops/design-tokens/globals.css';
import { cn } from '@amberops/lib';
import { ThemeProvider } from '@amberops/ui/components/theme-provider';
import { Toaster as DefaultToaster } from '@amberops/ui/components/ui/toaster';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Preloader } from '@amberops/ui/components/preloader';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const queryClient = new QueryClient();

function AppClientLayout({ children }: { children: React.ReactNode }) {
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

    return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <I18nextProvider i18n={i18n}>
                <QueryClientProvider client={queryClient}>
                    <AppClientLayout>{children}</AppClientLayout>
                    <Toaster position="bottom-right" data-testid="global-toaster" />
                    <DefaultToaster />
                </QueryClientProvider>
            </I18nextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
