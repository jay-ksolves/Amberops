
'use client';

import Link from 'next/link';
import { PageHeader } from '@amberops/ui';
import { Button } from '@amberops/ui/components/ui/button';
import { Badge } from '@amberops/ui/components/ui/badge';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui/components/ui/tooltip';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@amberops/ui/components/ui/dialog';
import { Label } from '@amberops/ui/components/ui/label';
import { Input } from '@amberops/ui/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@amberops/ui/components/ui/card';
import { fetchHosts } from '@amberops/api/client';
import { ArrowUpRight, PlusCircle, Server, ArrowUpDown, Cpu, MemoryStick, ArrowDown, ArrowUp } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Host } from '@amberops/lib';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

function getStatusBadgeVariant(status: 'healthy' | 'unhealthy' | 'restarting' | 'maintenance'): 'default' | 'destructive' | 'secondary' | 'secondary' {
  switch (status) {
    case 'healthy':
      return 'default';
    case 'unhealthy':
      return 'destructive';
    case 'restarting':
    case 'maintenance':
      return 'secondary';
  }
}

export const columns: ColumnDef<Host>[] = [
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
                <Server className="h-4 w-4 text-muted-foreground" />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="truncate block max-w-[200px]">{row.original.name}</span>
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
            <Badge variant={getStatusBadgeVariant(row.original.status)} className="capitalize">
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: 'ip',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                IP Address
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
                    <span>{row.original.ip}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.ip}</p>
                </TooltipContent>
            </Tooltip>
        )
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
        accessorKey: 'os',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                OS
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
                    <span className="truncate">{row.original.os}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.os}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        accessorKey: 'lastHeartbeat',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Last Heartbeat
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
                    <span>{row.original.lastHeartbeat}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.lastHeartbeat}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        id: 'actions',
        cell: ({ row }) => (
             <div className="text-right">
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild variant="ghost" size="sm">
                        <Link href={row.original.id ? `/hosts/${row.original.id}` : '#'}>
                            View Details <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>View host details</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        ),
    },
];

function HostCard({ host }: { host: Host }) {
    return (
        <Card>
            <CardHeader>
                 <div className="flex justify-between items-start">
                    <CardTitle className="truncate">{host.name}</CardTitle>
                    <Badge variant={getStatusBadgeVariant(host.status)} className="capitalize flex-shrink-0">{host.status}</Badge>
                </div>
                <CardDescription>{host.ip}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                 <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span>{host.cpuCores} Cores</span>
                </div>
                <div className="flex items-center gap-2">
                    <MemoryStick className="h-4 w-4 text-muted-foreground" />
                    <span>{host.memoryTotalGb}GB RAM</span>
                </div>
                 <div className="col-span-2">
                    <p className="text-muted-foreground truncate">{host.clusterName}</p>
                </div>
            </CardContent>
            <CardFooter>
                 <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={host.id ? `/hosts/${host.id}` : '#'}>
                        View Details <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function HostsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: hosts = [], isLoading } = useQuery<Host[]>({
        queryKey: ['hosts'],
        queryFn: fetchHosts,
    });

    const handleAddHost = () => {
        toast.success('Host registration initiated!');
        setIsModalOpen(false);
    }

  return (
    <div>
      <PageHeader
        title="Hosts"
        description="A list of all hosts across your clusters."
        actions={(
             <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Host
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Host</DialogTitle>
                        <DialogDescription>
                            Provide the hostname and cluster to add a new host.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="hostname" className="text-right">
                            Hostname
                            </Label>
                            <Input id="hostname" placeholder="e.g., worker-03.prod.amberops.io" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddHost}>Add Host</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
      />
       <DataTable
        columns={columns}
        data={hosts}
        filterKey="name"
        isLoading={isLoading}
        renderCard={(host) => <HostCard host={host} />}
        />
    </div>
  );
}
