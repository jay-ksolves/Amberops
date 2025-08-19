
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@amberops/ui/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@amberops/ui/components/ui/accordion';
import { Copy, AlertCircle } from 'lucide-react';
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
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center rounded-lg border bg-card p-4 text-center shadow-sm">
       <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-3xl font-headline font-bold text-destructive">An Error Occurred</h2>
        <p className="mt-2 text-lg text-muted-foreground">
            Something went wrong while trying to render this page.
        </p>
        <div className="flex gap-4 mt-8 justify-center">
            <Button onClick={() => reset()}>
            Try again
            </Button>
            <Button asChild variant="outline">
                <Link href="/dashboard">Go to Admin Dashboard</Link>
            </Button>
        </div>

        <div className="mt-8 text-left w-full max-w-2xl">
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>View Error Details</AccordionTrigger>
                    <AccordionContent>
                       <div className="relative rounded-md bg-muted p-4 border">
                         <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-2 top-2 h-7 z-10"
                            onClick={handleCopy}
                         >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                         </Button>
                         <ScrollArea className="h-72">
                            <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono break-all pr-4">
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
  )
}
