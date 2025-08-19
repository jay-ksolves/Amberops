
'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@amberops/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@amberops/ui/components/ui/card';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import { fetchDocumentationArticles } from '@amberops/api/client';
import type { DocumentationArticle } from '@amberops/lib';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';


export default function DocumentationLandingPage() {
    const [articles, setArticles] = useState<DocumentationArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            setIsLoading(true);
            try {
                const fetchedArticles = await fetchDocumentationArticles();
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Failed to load articles:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadArticles();
    }, []);

    return (
        <div className="container py-12">
            <PageHeader title="Documentation" description="Find articles and guides to help you get the most out of AmberOps." />
            {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                         <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-2/3" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                 <Skeleton className="h-4 w-4/5" />
                            </CardContent>
                             <CardFooter>
                                <Skeleton className="h-6 w-1/3" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <Card key={article.slug}>
                            <CardHeader>
                                <CardTitle>{article.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>A guide to understanding and using this feature.</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/documentation/${article.slug}`} className="text-primary hover:underline flex items-center gap-1">
                                    Read more <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
