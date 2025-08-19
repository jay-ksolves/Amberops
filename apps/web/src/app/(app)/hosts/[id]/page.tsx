
'use client';

import { notFound, useRouter } from 'next/navigation';
import { PageHeader } from '@amberops/ui/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@amberops/ui/components/ui/table';
import { Badge } from '@amberops/ui/components/ui/badge';
import { fetchHostById, fetchServices } from '@amberops/api/client';
import { Cpu, MemoryStick, HardDrive, Server, Power, CheckCircle2, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import type { Host, Service } from '@amberops/lib';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';

function getServiceStatusIcon(status: 'started' | 'stopped' | 'maintenance') {
  switch (status) {
    case 'started':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'stopped':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'maintenance':
      return <Clock className="h-4 w-4 text-yellow-500" />;
  }
}

export default function HostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  const { data: host, isLoading: isLoadingHost } = useQuery<Host, Error>({
    queryKey: ['host', params.id],
    queryFn: () => fetchHostById(params.id),
  });

  const { data: runningServices = [], isLoading: isLoadingServices } = useQuery<Service[], Error>({
    queryKey: ['services', host?.clusterId],
    queryFn: async () => {
      if (!host?.clusterId) return [];
      const allServices = await fetchServices();
      return allServices.filter(s => s.clusterId === host.clusterId);
    },
    enabled: !!host,
  });

  if (isLoadingHost) {
    return (
      <div>
        <PageHeader title={<Skeleton className="h-8 w-48" />} description={<Skeleton className="h-6 w-64" />} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!host) {
    notFound();
  }

  const handleReboot = () => {
    toast.loading(`Rebooting host ${host.name}...`, {
      duration: 2000,
    });
    setTimeout(() => {
        toast.success(`Host ${host.name} reboot initiated.`);
        router.push('/tasks');
    }, 2000);
  };

  return (
    <div>
      <PageHeader
        title={host.name}
        description={`Host details for ${host.ip}`}
        actions={(
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast("Actions clicked!")}>Actions</Button>
                <Button onClick={handleReboot}>
                <Power className="mr-2 h-4 w-4" />
                Reboot Host
                </Button>
            </div>
        )}
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Badge variant={host.status === 'healthy' ? 'default' : 'destructive'} className="text-lg capitalize">{host.status}</Badge>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{host.cpuCores} Cores</div>
                <p className="text-xs text-muted-foreground">{host.os}</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory</CardTitle>
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{host.memoryUsedGb}GB / {host.memoryTotalGb}GB</div>
                <p className="text-xs text-muted-foreground">Usage</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{host.storageUsedGb}GB / {host.storageTotalGb}GB</div>
                <p className="text-xs text-muted-foreground">Usage</p>
            </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Running Services</CardTitle>
            <CardDescription>Services and components running on this host.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Version</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingServices ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={3}><Skeleton className="h-5 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  runningServices.map(service => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getServiceStatusIcon(service.status)}
                          <span className="capitalize">{service.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{service.version}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
