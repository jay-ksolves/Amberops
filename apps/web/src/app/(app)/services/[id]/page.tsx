
'use client';

import { notFound, useRouter } from 'next/navigation';
import { PageHeader } from '@amberops/ui/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@amberops/ui/components/ui/table';
import { Badge } from '@amberops/ui/components/ui/badge';
import { fetchServiceById, fetchHosts, addTask } from '@amberops/api/client';
import { Play, Square, RefreshCw, CheckCircle2, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Service, Host, Task } from '@amberops/lib';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';

function getServiceStatusIcon(status: 'started' | 'stopped' | 'maintenance') {
  switch (status) {
    case 'started':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'stopped':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'maintenance':
      return <Clock className="h-5 w-5 text-yellow-500" />;
  }
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const { data: service, isLoading: isLoadingService } = useQuery<Service>({
    queryKey: ['service', params.id],
    queryFn: () => fetchServiceById(params.id),
  });

  const { data: serviceHosts = [], isLoading: isLoadingHosts } = useQuery<Host[]>({
    queryKey: ['serviceHosts', service?.clusterId],
    queryFn: async () => {
        if (!service?.clusterId) return [];
        const allHosts = await fetchHosts();
        return allHosts.filter(h => h.clusterId === service.clusterId).slice(0, 5);
    },
    enabled: !!service,
  });

  const taskMutation = useMutation<Task, Error, Omit<Task, 'id' | 'startTime' | 'duration' | 'progress'>>({
    mutationFn: addTask,
    onSuccess: (data) => {
        toast.success(`Task '${data.name}' created successfully.`);
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        router.push('/tasks');
    },
    onError: (error) => {
        toast.error(`Failed to create task: ${error.message}`);
    },
  });

  const handleAction = (action: 'start' | 'stop' | 'restart') => {
      if (!service) return;
      taskMutation.mutate({
          name: `${action.charAt(0).toUpperCase() + action.slice(1)} ${service.name}`,
          status: 'pending',
          user: 'admin',
          target: service.name,
      });
  };

  const handleRunServiceCheck = () => {
    if (!service) return;
    taskMutation.mutate({
        name: `Run Service Check for ${service.name}`,
        status: 'pending',
        user: 'admin',
        target: service.name,
    });
  }

  if (isLoadingService) {
    return (
        <div>
            <PageHeader title={<Skeleton className="h-8 w-48" />} description={<Skeleton className="h-6 w-80" />} />
             <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1 space-y-6">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
                 <div className="lg:col-span-2">
                    <Skeleton className="h-80 w-full" />
                 </div>
            </div>
        </div>
    );
  }

  if (!service) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={service.name}
        description={`Service details for ${service.name} on cluster ${service.clusterName}`}
        actions={(
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleAction('start')} disabled={taskMutation.isPending}><Play className="mr-2 h-4 w-4" />Start</Button>
                <Button variant="outline" onClick={() => handleAction('stop')} disabled={taskMutation.isPending}><Square className="mr-2 h-4 w-4" />Stop</Button>
                <Button onClick={() => handleAction('restart')} disabled={taskMutation.isPending}><RefreshCw className="mr-2 h-4 w-4" />Restart Service</Button>
            </div>
        )}
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Service Status</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    {getServiceStatusIcon(service.status)}
                    <div>
                        <p className="text-2xl font-bold capitalize">{service.status}</p>
                        <p className="text-sm text-muted-foreground">Version: {service.version}</p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                   <Button asChild variant="link" className="justify-start p-0 h-auto"><Link href="/config">View Configurations</Link></Button>
                   <Button variant="link" className="justify-start p-0 h-auto" onClick={handleRunServiceCheck} disabled={taskMutation.isPending}>Run Service Check</Button>
                   <Button variant="link" className="justify-start p-0 h-auto" onClick={() => toast('Metrics view coming soon!')}>View Metrics</Button>
                </CardContent>
            </Card>
        </div>
         <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Service Hosts</CardTitle>
                    <CardDescription>{service.runningHosts} of {service.totalHosts} hosts are running this service.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Host</TableHead>
                            <TableHead>IP</TableHead>
                            <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoadingHosts ? (
                                Array.from({length: 3}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={3}><Skeleton className="h-6 w-full" /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                serviceHosts.map(host => (
                                    <TableRow key={host.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/hosts/${host.id}`} className="hover:underline">
                                                {host.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{host.ip}</TableCell>
                                        <TableCell><Badge variant={host.status === 'healthy' ? 'default' : 'destructive'} className="capitalize">{host.status}</Badge></TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
