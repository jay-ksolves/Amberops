
'use client';

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from 'next/font/google';
import "@amberops/design-tokens/globals.css";
import "@/styles/animated-theme.css";
import "@/styles/auth-form.css";
import "@/styles/animated-globe.css";
import "@/styles/footer-animation.css";
import "@/styles/not-found.css";
import "@/styles/pricing-card.css";
import "@/styles/thunder-cursor.css";
import "@/styles/testimonials-marquee.css";
import "@/styles/feature-carousel.css";
import "@/styles/integrations-grid.css";
import "@/styles/legal-page.css";
import { cn } from "@amberops/lib";
import { ThemeProvider } from "@amberops/ui/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { ThunderCursor } from "../components/thunder-cursor";
import { ScrollToTopButton } from "../components/scroll-to-top-button";
import { Preloader } from "@amberops/ui/components/preloader";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const queryClient = new QueryClient();

// We can't use the metadata export with 'use client'.
// We can set the title in the useEffect hook if needed.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "AmberOps - The Future of Cluster Management";
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
         className={cn(
          'min-h-screen bg-background font-body antialiased text-foreground home-body',
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
            {isLoading ? <Preloader /> : (
            <QueryClientProvider client={queryClient}>
                    <ThunderCursor />
                    {children}
                    <ScrollToTopButton />
                    <Toaster position="bottom-right" data-testid="global-toaster" />
            </QueryClientProvider>
            )}
        </ThemeProvider>
        </body>
    </html>
  );
}
