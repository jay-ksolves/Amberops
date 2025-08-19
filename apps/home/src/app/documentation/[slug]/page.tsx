
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@amberops/ui';
import { Card, CardContent } from '@amberops/ui/components/ui/card';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import type { DocumentationArticle } from '@amberops/lib';
import { useQuery } from '@tanstack/react-query';
import { fetchDocumentationArticles } from '@amberops/api/client';

function ArticlePageSkeleton() {
    return (
        <div className="max-w-4xl mx-auto">
            <PageHeader title={<Skeleton className="h-10 w-2/3" />} description={<Skeleton className="h-6 w-1/3" />} />
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <br />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/5" />
                </CardContent>
            </Card>
        </div>
    );
}


export default function DocumentationArticlePage({ params }: { params: { slug: string } }) {
    const { data: article, isLoading } = useQuery<DocumentationArticle | null, Error>({
        queryKey: ['documentationArticle', params.slug],
        queryFn: async () => {
            // This is not efficient, but works for the prototype without a dedicated 'fetchBySlug' endpoint
            const articles = await fetchDocumentationArticles();
            const foundArticle = articles.find(a => a.slug === params.slug) || null;
            if (!foundArticle) {
                // Not found will be caught by the rendering logic below
                return null;
            }
            return foundArticle;
        },
    });

    useEffect(() => {
        if (!isLoading && !article) {
            notFound();
        }
    }, [isLoading, article]);


    return (
        <div className="container py-12">
            {isLoading ? (
                <ArticlePageSkeleton />
            ) : article ? (
                 <div className="max-w-4xl mx-auto">
                    <PageHeader title={article.title} description={`Last updated at ${new Date(article.updatedAt).toLocaleDateString()}`} />
                    <Card>
                        <CardContent className="prose dark:prose-invert max-w-none pt-6">
                           <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        </CardContent>
                    </Card>
                </div>
            ) : null}
        </div>
    );
}
