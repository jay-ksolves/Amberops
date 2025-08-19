
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@amberops/ui';
import { Card, CardContent } from '@amberops/ui/components/ui/card';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import type { LegalDocument } from '@amberops/lib';
import { useQuery } from '@tanstack/react-query';
import { fetchLegalDocument } from '@amberops/api/client';

function LegalPageSkeleton() {
    return (
        <div className="max-w-4xl mx-auto">
            <PageHeader title={<Skeleton className="h-10 w-1/2" />} description={<Skeleton className="h-6 w-1/3" />} />
             <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <br />
                    <Skeleton className="h-6 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </CardContent>
            </Card>
        </div>
    );
}

export default function LegalPage({ params }: { params: { type: string } }) {
    const docType = params.type === 'terms-of-service' ? 'terms' : params.type === 'privacy-policy' ? 'privacy' : null;

    const { data: doc, isLoading } = useQuery<LegalDocument | null, Error>({
        queryKey: ['legalDoc', docType],
        queryFn: async () => {
            if (!docType) return null;
            return fetchLegalDocument(docType);
        },
        enabled: !!docType,
    });

    useEffect(() => {
        if (!docType || (!isLoading && !doc)) {
            notFound();
        }
    }, [docType, isLoading, doc]);

    const title = docType === 'terms' ? 'Terms of Service' : 'Privacy Policy';

    return (
        <div className="container py-12">
            {isLoading || !doc ? (
                <LegalPageSkeleton />
            ) : (
                <div className="max-w-4xl mx-auto">
                    <PageHeader title={title} description={`Last updated at ${new Date(doc.updatedAt).toLocaleDateString()}`} />
                    <Card>
                        <CardContent className="p-6 md:p-8">
                            <div className="legal-content" dangerouslySetInnerHTML={{ __html: doc.content }} />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
