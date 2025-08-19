
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@amberops/ui/components/ui/button';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@amberops/ui/components/ui/accordion';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { ScrollArea } from '@amberops/ui/components/ui/scroll-area';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    console.error(error)
    const details = `Error: ${error.message}\n\nDigest: ${error.digest || 'N/A'}\n\nStack Trace:\n${error.stack || 'Not available'}`;
    setErrorDetails(details);
  }, [error])

  const handleCopy = () => {
    navigator.clipboard.writeText(errorDetails);
    toast.success('Error details copied to clipboard!');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 overflow-y-auto">
       <div className="w-full max-w-2xl text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
                <AmberOpsLogo className="h-12 w-12" />
                <h1 className="font-headline text-3xl font-semibold">AmberOps</h1>
            </div>
            <h2 className="text-6xl font-headline font-bold text-destructive">Error</h2>
            <p className="mt-4 text-2xl font-semibold">Something went wrong</p>
            <p className="mt-2 text-muted-foreground">
                An unexpected error occurred. Please try again, or if the problem persists, contact support.
            </p>
            <div className="flex gap-4 mt-8 justify-center">
                <Button onClick={() => reset()}>
                Try again
                </Button>
                <Button asChild variant="outline">
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </div>

            <div className="mt-8 text-left">
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>View Error Details</AccordionTrigger>
                        <AccordionContent>
                           <div className="relative rounded-md bg-muted p-4">
                             <Button
                                size="sm"
                                variant="ghost"
                                className="absolute right-2 top-2 h-7 z-10"
                                onClick={handleCopy}
                             >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Details
                             </Button>
                             <ScrollArea className="h-72">
                                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono break-all pr-4">
                                    <code>
                                        {errorDetails}
                                    </code>
                                </pre>
                             </ScrollArea>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
       </div>
    </div>
  )
}
