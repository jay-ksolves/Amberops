
'use client';

import { notFound } from 'next/navigation';
import { PageHeader } from '@amberops/ui';
import { Button } from '@amberops/ui/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@amberops/ui/components/ui/card';
import { Badge } from '@amberops/ui/components/ui/badge';
import { fetchAlertById, updateAlert } from '@amberops/api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Server, HardDrive, Clock } from 'lucide-react';
import Link from 'next/link';
import { TroubleshootingSteps } from '@/components/troubleshooting-steps';
import toast from 'react-hot-toast';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import type { Alert } from '@amberops/lib';

function getSeverityBadgeVariant(severity: 'critical' | 'warning' | 'info'): 'destructive' | 'secondary' | 'default' {
    switch (severity) {
        case 'critical':
            return 'destructive';
        case 'warning':
            return 'secondary';
        case 'info':
        default:
            return 'default';
    }
}

export default function AlertDetailPage({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();

  const { data: alert, isLoading } = useQuery<Alert, Error>({
    queryKey: ['alert', params.id],
    queryFn: () => fetchAlertById(params.id),
  });

  const mutation = useMutation<Alert, Error, Partial<Alert>>({
    mutationFn: (updatedAlert) => updateAlert(params.id, updatedAlert),
    onSuccess: (data) => {
      toast.success(`Alert "${data.name}" has been updated to ${data.status}.`);
      queryClient.invalidateQueries({ queryKey: ['alert', params.id] });
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (error) => {
      toast.error(`Failed to update alert: ${error.message}`);
    },
  });

  const handleAcknowledge = () => {
    mutation.mutate({ status: 'acknowledged' });
  };

  const handleResolve = () => {
    mutation.mutate({ status: 'resolved' });
  };

  if (isLoading) {
    return (
        <div>
            <PageHeader title={<Skeleton className="h-8 w-64" />} description={<Skeleton className="h-6 w-96" />} />
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
                <div className="lg:col-span-1">
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        </div>
    );
  }

  if (!alert) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={alert.name}
        description="Details for the triggered alert."
        actions={(
            <div className="flex gap-2">
                <Button variant="outline" onClick={handleAcknowledge} disabled={mutation.isPending}>
                    {mutation.isPending && mutation.variables?.status === 'acknowledged' ? 'Acknowledging...' : 'Acknowledge'}
                </Button>
                <Button onClick={handleResolve} disabled={mutation.isPending}>
                    {mutation.isPending && mutation.variables?.status === 'resolved' ? 'Resolving...' : 'Resolve'}
                </Button>
            </div>
        )}
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Alert Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 mt-1 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Severity</p>
                                <Badge variant={getSeverityBadgeVariant(alert.severity)} className="text-md capitalize">{alert.severity}</Badge>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 mt-1 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Timestamp</p>
                                <p className="font-semibold">{new Date(alert.timestamp).toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Server className="h-5 w-5 mt-1 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Cluster</p>
                                <Link href={`/clusters/${alert.clusterId}`} className="font-semibold hover:underline">{alert.clusterName}</Link>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <HardDrive className="h-5 w-5 mt-1 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Service</p>
                                <p className="font-semibold">{alert.serviceName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-muted-foreground">{alert.description}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Related Logs</CardTitle>
                    <CardDescription>Relevant log entries around the time of the alert.</CardDescription>
                </CardHeader>
                <CardContent>
                    <pre className="bg-muted p-4 rounded-lg text-sm text-muted-foreground overflow-x-auto">
                        <code>{alert.relatedLogs}</code>
                    </pre>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
          <TroubleshootingSteps alert={alert} />
        </div>
      </div>
    </div>
  );
}
