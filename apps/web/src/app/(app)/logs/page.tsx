
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import { Input } from '@amberops/ui/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@amberops/ui/components/ui/table';
import { Card, CardContent } from '@amberops/ui/components/ui/card';
import { Badge } from '@amberops/ui/components/ui/badge';
import { ScrollArea } from '@amberops/ui/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@amberops/ui/components/ui/select';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchLogEntries, fetchClusters, fetchServices } from '@amberops/api/client';
import { Search, PlayCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useMemo } from 'react';
import type { LogEntry, Cluster, Service } from '@amberops/lib';

function getLevelBadgeVariant(level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'): 'default' | 'destructive' | 'secondary' {
  switch (level) {
    case 'ERROR':
      return 'destructive';
    case 'WARN':
      return 'secondary';
    case 'INFO':
    case 'DEBUG':
    default:
      return 'default';
  }
}

export default function LogsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState('all');
    const [serviceFilter, setServiceFilter] = useState('all');
    const [clusterFilter, setClusterFilter] = useState('all');

    const { data: logs = [], isLoading: isLoadingLogs } = useQuery<LogEntry[]>({
        queryKey: ['logEntries'],
        queryFn: fetchLogEntries,
    });

    const { data: clusters = [], isLoading: isLoadingClusters } = useQuery<Cluster[]>({
        queryKey: ['clusters'],
        queryFn: fetchClusters,
    });

    const { data: services = [], isLoading: isLoadingServices } = useQuery<Service[]>({
        queryKey: ['services'],
        queryFn: fetchServices,
    });

    const filteredLogs = useMemo(() => {
        let filtered = logs;

        if (searchQuery) {
            filtered = filtered.filter(log => log.message.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (levelFilter !== 'all') {
            filtered = filtered.filter(log => log.level === levelFilter);
        }
        if (serviceFilter !== 'all') {
            filtered = filtered.filter(log => log.component === serviceFilter);
        }
        if (clusterFilter !== 'all') {
             toast.info("Cluster filtering is not fully implemented in this prototype.");
        }
        
        return filtered;
    }, [logs, searchQuery, levelFilter, serviceFilter, clusterFilter]);


    const clearFilters = () => {
        setSearchQuery('');
        setLevelFilter('all');
        setServiceFilter('all');
        setClusterFilter('all');
        toast.success('Filters cleared.');
    };

    const uniqueServices = useMemo(() => {
        if (!services) return [];
        return Array.from(new Set(services.map(s => s.name)))
    }, [services]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        title="Log Search"
        description="Search and tail logs from all hosts and services."
      />
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-grow min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search logs by message..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
                <SelectItem value="WARN">Warning</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
                <SelectItem value="DEBUG">Debug</SelectItem>
            </SelectContent>
        </Select>
         <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by service..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {isLoadingServices ? <SelectItem value="loading" disabled>Loading...</SelectItem> : uniqueServices.map(comp => (
                    <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Select value={clusterFilter} onValueChange={setClusterFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by cluster..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Clusters</SelectItem>
                 {isLoadingClusters ? <SelectItem value="loading" disabled>Loading...</SelectItem> : clusters.map(cluster => (
                    <SelectItem key={cluster.id} value={cluster.id}>{cluster.name}</SelectItem>
                 ))}
            </SelectContent>
        </Select>
        <Button variant="outline" onClick={clearFilters}><X className="h-4 w-4 mr-2" />Clear</Button>
        <Button variant="outline" className="ml-auto" onClick={() => toast('Live tail feature coming soon!')}>
          <PlayCircle className="h-4 w-4 mr-2" />Live Tail
        </Button>
      </div>
      <Card className="flex-grow flex flex-col">
        <CardContent className="p-0 flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead className="w-[80px]">Level</TableHead>
                  <TableHead className="w-[150px]">Host</TableHead>
                  <TableHead className="w-[180px]">Service</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingLogs ? (
                    Array.from({length: 10}).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell><Skeleton className="h-5 w-[160px]"/></TableCell>
                            <TableCell><Skeleton className="h-5 w-[60px]"/></TableCell>
                            <TableCell><Skeleton className="h-5 w-[130px]"/></TableCell>
                            <TableCell><Skeleton className="h-5 w-[160px]"/></TableCell>
                            <TableCell><Skeleton className="h-5 w-full"/></TableCell>
                        </TableRow>
                    ))
                ) : (
                    filteredLogs.map((log, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-mono text-xs">{new Date(log.timestamp).toISOString()}</TableCell>
                            <TableCell><Badge variant={getLevelBadgeVariant(log.level)}>{log.level}</Badge></TableCell>
                            <TableCell className="font-mono text-xs">{log.host}</TableCell>
                            <TableCell className="font-mono text-xs">{log.component}</TableCell>
                            <TableCell className="font-mono text-sm">{log.message}</TableCell>
                        </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
