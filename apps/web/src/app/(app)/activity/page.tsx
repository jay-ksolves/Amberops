
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { fetchActivityLogs } from '@amberops/api/client';
import type { ColumnDef } from '@tanstack/react-table';
import type { ActivityLog } from '@amberops/lib';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@amberops/ui/components/ui/avatar';
import { Badge } from '@amberops/ui/components/ui/badge';
import { Button } from '@amberops/ui/components/ui/button';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui/components/ui/tooltip';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import { DataTable } from '@amberops/ui/components/data-table';
import { useQuery } from '@tanstack/react-query';

function getActionBadgeVariant(action: 'LOGIN' | 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTART' | 'ACKNOWLEDGE'): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (action) {
        case 'CREATE':
            return 'default';
        case 'UPDATE':
        case 'ACKNOWLEDGE':
        case 'RESTART':
            return 'secondary';
        case 'DELETE':
            return 'destructive';
        case 'LOGIN':
        default:
            return 'outline';
    }
}

export const columns: ColumnDef<ActivityLog>[] = [
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
            data-testid="select-all-checkbox"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            data-testid={`select-row-${row.original.id}-checkbox`}
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'user',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
                data-testid="sort-by-user-button"
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
        cell: ({ row }) => {
            const { user } = row.original;
            if (!user || !user.name) {
                return <div className="text-muted-foreground">System Action</div>;
            }
            return (
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0) ?? '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'action',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
                data-testid="sort-by-action-button"
            >
                Action
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => <Badge variant={getActionBadgeVariant(row.original.action)}>{row.original.action}</Badge>
    },
    {
        accessorKey: 'details',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
                data-testid="sort-by-details-button"
            >
                Details
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
                    <span className="truncate block max-w-[250px]">{row.original.details}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.details}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        accessorKey: 'timestamp',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
                data-testid="sort-by-time-button"
            >
                Time
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
                    <span>{formatDistanceToNow(new Date(row.original.timestamp), { addSuffix: true })}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{new Date(row.original.timestamp).toLocaleString()}</p>
                </TooltipContent>
            </Tooltip>
        )
    }
];

export default function ActivityPage() {
    const { data: activityLogs = [], isLoading } = useQuery<ActivityLog[]>({
        queryKey: ['activityLogs'],
        queryFn: fetchActivityLogs,
    });

  return (
    <div>
      <PageHeader
        title="Activity Log"
        description="An immutable log of all user and system activities."
      />
      <DataTable columns={columns} data={activityLogs} filterKey="details" isLoading={isLoading} />
    </div>
  );
}
