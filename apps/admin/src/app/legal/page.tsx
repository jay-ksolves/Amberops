'use client';

import {
  fetchLegalDocument,
  updateLegalDocument,
} from '@amberops/api/client';
import type { LegalDocument } from '@amberops/lib';
import { Button } from '@amberops/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@amberops/ui/components/ui/card';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import { Textarea } from '@amberops/ui/components/ui/textarea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@amberops/ui/components/ui/tabs';
import { PageHeader } from '@amberops/ui/components/page-header';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function LegalEditor({ type }: { type: 'terms' | 'privacy' }) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');

  const { data, isLoading } = useQuery<LegalDocument>({
    queryKey: ['legal', type],
    queryFn: () => fetchLegalDocument(type),
    enabled: !!type,
  });

  useEffect(() => {
    if (data?.content) {
      setContent(data.content);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (newContent: string) =>
      updateLegalDocument(type, { content: newContent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legal', type] });
      toast.success(
        `${
          type === 'terms' ? 'Terms of Service' : 'Privacy Policy'
        } updated successfully!`,
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSave = () => {
    mutation.mutate(content);
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" data-testid="legal-editor-skeleton" />;
  }

  return (
    <Card data-testid={`legal-editor-${type}`}>
      <CardHeader>
        <CardTitle className="capitalize">
          {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
        </CardTitle>
        <CardDescription>
          Last updated:{' '}
          {data ? new Date(data.updatedAt).toLocaleString() : 'N/A'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-96 font-mono"
          placeholder="Enter content here. Use HTML for formatting."
          data-testid="content-textarea"
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSave}
          disabled={mutation.isPending}
          data-testid="save-button"
        >
          {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function AdminLegalPage() {
  return (
    <div>
      <PageHeader
        title="Manage Legal Documents"
        description="Update the Terms of Service and Privacy Policy for your application."
      />
      <Tabs defaultValue="terms" data-testid="legal-tabs">
        <TabsList>
          <TabsTrigger value="terms" data-testid="terms-tab-trigger">
            Terms of Service
          </TabsTrigger>
          <TabsTrigger value="privacy" data-testid="privacy-tab-trigger">
            Privacy Policy
          </TabsTrigger>
        </TabsList>
        <TabsContent value="terms" data-testid="terms-tab-content">
          <LegalEditor type="terms" />
        </TabsContent>
        <TabsContent value="privacy" data-testid="privacy-tab-content">
          <LegalEditor type="privacy" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
