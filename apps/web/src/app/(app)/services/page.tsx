
'use client';

import Link from 'next/link';
import { PageHeader } from '@amberops/ui/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@amberops/ui/components/ui/dropdown-menu';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui/components/ui/tooltip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@amberops/ui/components/ui/card';
import { Badge } from '@amberops/ui/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@amberops/ui/components/ui/dialog';
import { Label } from '@amberops/ui/components/ui/label';
import { Input } from '@amberops/ui/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@amberops/ui/components/ui/select';
import { fetchServices, fetchClusters, addService } from '@amberops/api/client';
import { ArrowUpRight, CheckCircle2, XCircle, Clock, HardDrive, MoreHorizontal, Play, Square, RefreshCw, ArrowUpDown, ArrowDown, ArrowUp, PlusCircle } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Service, Cluster } from '@amberops/lib';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

const handleAction = (serviceName: string, action: string) => {
    toast.success(`Task to ${action} ${serviceName} created successfully.`);
};

export const columns: ColumnDef<Service>[] = [
    {
        id: 'select',
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Name
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-medium flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="truncate">{row.original.name}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.original.name}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Status
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {getServiceStatusIcon(row.original.status)}
                <span className="capitalize">{row.original.status}</span>
            </div>
        ),
    },
    {
        accessorKey: 'clusterName',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Cluster
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={`/clusters/${row.original.clusterId}`} className="hover:underline truncate block max-w-[150px]">
                        {row.original.clusterName}
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.clusterName}</p>
                </TooltipContent>
            </Tooltip>
        ),
    },
    {
        accessorKey: 'version',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Version
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="truncate">{row.original.version}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.version}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        accessorKey: 'runningHosts',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Running Hosts
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => `${row.original.runningHosts} / ${row.original.totalHosts}`,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={row.original.id ? `/services/${row.original.id}` : '#'}>
                        View <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                     <span className="sr-only">More actions</span>
                                </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>More actions</p>
                            </TooltipContent>
                        </Tooltip>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction(row.original.name, 'start')}>
                            <Play className="mr-2 h-4 w-4" />
                            Start
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction(row.original.name, 'stop')}>
                            <Square className="mr-2 h-4 w-4" />
                            Stop
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction(row.original.name, 'restart')}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Restart
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        ),
    },
];

function ServiceCard({ service }: { service: Service }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="truncate flex items-center gap-2">
                        <HardDrive className="h-5 w-5 text-muted-foreground" />
                        {service.name}
                    </CardTitle>
                    <Badge variant={service.status === 'started' ? 'default' : service.status === 'stopped' ? 'destructive' : 'secondary'} className="capitalize flex-shrink-0">{service.status}</Badge>
                </div>
                <CardDescription className="truncate">{service.clusterName}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Version</p>
                    <p className="font-semibold">{service.version}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Running Hosts</p>
                    <p className="font-semibold">{service.runningHosts} / {service.totalHosts}</p>
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={service.id ? `/services/${service.id}` : '#'}>
                        View <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm" className="px-3">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More actions</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction(service.name, 'start')}>
                            <Play className="mr-2 h-4 w-4" />
                            Start
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction(service.name, 'stop')}>
                            <Square className="mr-2 h-4 w-4" />
                            Stop
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction(service.name, 'restart')}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Restart
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    )
}

function AddServiceDialog({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    const queryClient = useQueryClient();
    const { data: clusters = [] } = useQuery<Cluster[]>({
        queryKey: ['clusters'],
        queryFn: fetchClusters,
    });

    const mutation = useMutation({
        mutationFn: addService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            toast.success('Task to add new service has been created!');
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(`Failed to add service: ${error.message}`);
        }
    });

    const handleAddService = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const clusterId = formData.get('cluster') as string;
        const selectedCluster = clusters.find(c => c.id === clusterId);

        const newService: Omit<Service, 'id'> = {
            name: formData.get('service') as string,
            clusterId,
            clusterName: selectedCluster?.name || '',
            status: 'stopped',
            runningHosts: 0,
            totalHosts: selectedCluster?.hostCount || 0,
            version: '1.0.0', // Default version
        };
        mutation.mutate(newService);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Service
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                        Choose a cluster and service to install.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddService}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cluster" className="text-right">Cluster</Label>
                            <Select name="cluster" required>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a cluster" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clusters.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="service" className="text-right">Service</Label>
                            <Select name="service" required>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Zookeeper">Zookeeper</SelectItem>
                                    <SelectItem value="Ambari Metrics">Ambari Metrics</SelectItem>
                                    <SelectItem value="HBase">HBase</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Adding...' : 'Add Service'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function ServicesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: services = [], isLoading } = useQuery<Service[]>({
        queryKey: ['services'],
        queryFn: fetchServices,
    });

  return (
    <div>
      <PageHeader
        title="Services"
        description="A list of all services running across your clusters."
        actions={(
            <AddServiceDialog isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
        )}
      />
      <DataTable
        columns={columns}
        data={services}
        filterKey="name"
        isLoading={isLoading}
        renderCard={(service) => <ServiceCard service={service} />}
       />
    </div>
  );
}
