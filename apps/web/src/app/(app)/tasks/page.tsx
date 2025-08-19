
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { Progress } from '@amberops/ui/components/ui/progress';
import { Badge } from '@amberops/ui/components/ui/badge';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@amberops/ui/components/ui/card';
import { fetchTasks } from '@amberops/api/client';
import { CheckCircle, XCircle, Loader, CircleDotDashed, ArrowUpDown, Server, HardDrive, ArrowDown, ArrowUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Task } from '@amberops/lib';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@amberops/ui/components/ui/button';

function getStatusIcon(status: 'running' | 'completed' | 'failed' | 'pending') {
  switch (status) {
    case 'running':
      return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-white" />;
    case 'pending':
      return <CircleDotDashed className="h-4 w-4 text-muted-foreground" />;
  }
}

function getStatusBadgeVariant(status: 'running' | 'completed' | 'failed' | 'pending'): 'default' | 'destructive' | 'secondary' {
    switch (status) {
        case 'completed':
            return 'default';
        case 'failed':
            return 'destructive';
        case 'running':
        case 'pending':
            return 'secondary';
    }
}

export const columns: ColumnDef<Task>[] = [
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
        accessorKey: 'id',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Task ID
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
                    <span className="font-mono text-xs text-muted-foreground">#{row.original.id}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Task ID: {row.original.id}</p>
                </TooltipContent>
            </Tooltip>
        )
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
                    <span className="font-medium truncate block max-w-[250px]">{row.original.name}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.name}</p>
                </TooltipContent>
            </Tooltip>
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
                <div className="flex items-center gap-2">
                {getStatusIcon(row.original.status)}
                <span>{row.original.status}</span>
                </div>
            </Badge>
        ),
    },
    {
        accessorKey: 'progress',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Progress
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
                <Progress value={row.original.progress} className="h-2 w-32" />
                <span className="text-muted-foreground text-sm">{row.original.progress}%</span>
            </div>
        )
    },
    {
        accessorKey: 'user',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                User
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
                    <span className="truncate">{row.original.user}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.user}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        accessorKey: 'duration',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Duration
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
    },
    {
        accessorKey: 'startTime',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Start Time
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => {
            const startTime = new Date(row.original.startTime);
            return (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>{formatDistanceToNow(startTime, { addSuffix: true })}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{startTime.toLocaleString()}</p>
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
]

const SubRowComponent = ({ task }: { task: Task }) => {
    const startTime = new Date(task.startTime); // Convert string to Date object
    return (
        <div className="bg-muted/50 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Task Details</CardTitle>
                    <CardDescription>
                        Additional context and logs for task #{task.id}.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <p className="text-muted-foreground">Target:</p>
                        <p className="font-semibold">{task.target || 'N/A'}</p>
                    </div>
                     <div className="col-span-2">
                        <p className="text-muted-foreground mb-2">Logs</p>
                        <pre className="bg-background p-3 rounded text-xs overflow-x-auto">
                            <code>
                                {`[${startTime.toISOString()}] INFO: Starting task '${task.name}' initiated by ${task.user}.\n`}
                                {task.progress > 10 && `[${new Date(startTime.getTime() + 5000).toISOString()}] INFO: Validating parameters for target ${task.target}.\n`}
                                {task.progress > 40 && `[${new Date(startTime.getTime() + 10000).toISOString()}] INFO: Executing operation on target.\n`}
                                {task.status === 'failed' && `[${new Date(startTime.getTime() + 15000).toISOString()}] ERROR: Operation failed. See error logs for details.`}
                                {task.status === 'completed' && `[${new Date(startTime.getTime() + 25000).toISOString()}] INFO: Task completed successfully.`}
                            </code>
                        </pre>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function TasksPage() {
    const { data: tasks = [], isLoading } = useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

  return (
    <div>
      <PageHeader
        title="Tasks & Operations"
        description="Track background operations and service checks."
      />
      <DataTable 
        columns={columns} 
        data={tasks} 
        filterKey="name" 
        isLoading={isLoading}
        renderSubComponent={(row) => <SubRowComponent task={row} />}
      />
    </div>
  );
}
