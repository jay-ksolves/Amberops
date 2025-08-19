
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import { Switch } from '@amberops/ui/components/ui/switch';
import { Badge } from '@amberops/ui/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@amberops/ui/components/ui/dropdown-menu';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@amberops/ui/components/ui/tooltip';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@amberops/ui/components/ui/dialog';
import { Label } from '@amberops/ui/components/ui/label';
import { Input } from '@amberops/ui/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@amberops/ui/components/ui/select';
import { fetchAlertDefinitions, addAlertDefinition, updateAlertDefinition, deleteAlertDefinition } from '@amberops/api/client';
import { PlusCircle, MoreHorizontal, ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { AlertDefinition } from '@amberops/lib';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function AlertDefinitionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: alertDefinitions = [], isLoading } = useQuery<AlertDefinition[]>({
        queryKey: ['alertDefinitions'],
        queryFn: fetchAlertDefinitions,
    });

    const createMutation = useMutation({
        mutationFn: addAlertDefinition,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alertDefinitions'] });
            toast.success('New alert definition created!');
            setIsModalOpen(false);
        },
        onError: (error) => {
            toast.error(`Failed to create definition: ${error.message}`);
        },
    });

    const handleCreateDefinition = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newDefinition = {
            name: formData.get('name') as string,
            service: formData.get('service') as string,
            type: formData.get('type') as 'METRIC' | 'PORT' | 'SCRIPT',
            description: `A new alert definition for ${formData.get('name') as string}`,
            enabled: true,
        };
        createMutation.mutate(newDefinition);
    }
    
    const columns: ColumnDef<AlertDefinition>[] = [
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
            accessorKey: 'enabled',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting()}
                >
                    Enabled
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
                <Switch checked={row.original.enabled} aria-label={`Enable ${row.original.name}`} />
            ),
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
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="font-medium truncate block max-w-[200px]">{row.original.name}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.original.name}</p>
                    </TooltipContent>
                </Tooltip>
            ),
        },
        {
            accessorKey: 'service',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting()}
                >
                    Service
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
                        <span className="truncate">{row.original.service}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.original.service}</p>
                    </TooltipContent>
                </Tooltip>
            )
        },
        {
            accessorKey: 'type',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting()}
                >
                    Type
                    {column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    ) : column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            ),
            cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="text-muted-foreground truncate block max-w-[300px]">{row.original.description}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.original.description}</p>
                    </TooltipContent>
                </Tooltip>
            ),
        },
        {
            id: 'actions',
            cell: () => (
                <div className="text-right">
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open actions</span>
                                </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Open actions</p>
                            </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ];

  return (
    <div>
      <PageHeader
        title="Alert Definitions"
        description="Create and manage alert definitions for your services."
        actions={(
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Definition
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Alert Definition</DialogTitle>
                        <DialogDescription>
                            Define a new alert to monitor your services.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateDefinition}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" name="name" placeholder="e.g., Namenode RPC Latency" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="service" className="text-right">Service</Label>
                                <Select name="service" required>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hdfs">HDFS</SelectItem>
                                        <SelectItem value="yarn">YARN</SelectItem>
                                        <SelectItem value="kafka">Kafka</SelectItem>
                                        <SelectItem value="spark">Spark</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">Type</Label>
                                <Select name="type" required>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="METRIC">METRIC</SelectItem>
                                        <SelectItem value="PORT">PORT</SelectItem>
                                        <SelectItem value="SCRIPT">SCRIPT</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={createMutation.isPending}>
                                {createMutation.isPending ? 'Creating...' : 'Create Definition'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        )}
      />
      <DataTable columns={columns} data={alertDefinitions} filterKey="name" isLoading={isLoading} />
    </div>
  );
}
