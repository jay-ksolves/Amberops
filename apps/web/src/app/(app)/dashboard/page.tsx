
'use client';

import { PageHeader } from "@amberops/ui";
import { Button } from "@amberops/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@amberops/ui/components/ui/card";
import { Progress } from "@amberops/ui/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@amberops/ui/components/ui/table";
import { Badge } from "@amberops/ui/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@amberops/ui/components/ui/select";
import { Tooltip, TooltipTrigger, TooltipContent } from "@amberops/ui/components/ui/tooltip";
import { Skeleton } from "@amberops/ui/components/ui/skeleton";
import { fetchClusters, fetchAlerts } from '@amberops/api/client';
import { ArrowUpRight, Cpu, MemoryStick, Server, Siren, Rocket } from "lucide-react";
import Link from 'next/link';
import { ClusterHealthSummary } from "@/components/cluster-health-summary";
import { useState, useEffect, useMemo } from "react";
import type { Cluster, Alert } from "@amberops/lib";
import { OnboardingTour } from "@/components/onboarding-tour";
import { useQuery } from '@tanstack/react-query';

function getStatusColor(status: 'healthy' | 'unhealthy' | 'degraded') {
  switch (status) {
    case 'healthy':
      return 'bg-green-500';
    case 'degraded':
      return 'bg-yellow-500';
    case 'unhealthy':
      return 'bg-red-500';
  }
}

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

export default function DashboardPage() {
    const { data: clusters = [], isLoading: isLoadingClusters } = useQuery<Cluster[]>({
        queryKey: ['clusters'],
        queryFn: fetchClusters,
    });
    
    const { data: alerts = [], isLoading: isLoadingAlerts } = useQuery<Alert[]>({
        queryKey: ['alerts'],
        queryFn: fetchAlerts,
    });

    const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
    const [runTour, setRunTour] = useState(false);

    useEffect(() => {
        if (clusters.length > 0 && !selectedCluster) {
            setSelectedCluster(clusters[0]);
        }
    }, [clusters, selectedCluster]);

    const handleClusterChange = (clusterId: string) => {
        const cluster = clusters.find(c => c.id === clusterId);
        if (cluster) {
            setSelectedCluster(cluster);
        }
    };
    
    // Auto-start tour for first-time visit (simulated with sessionStorage)
    useState(() => {
        if (typeof window !== 'undefined' && !sessionStorage.getItem('amberops_tour_completed')) {
            setRunTour(true);
            sessionStorage.setItem('amberops_tour_completed', 'true');
        }
    });

    const totalClusters = clusters.length;
    const totalAlerts = alerts.filter(a => a.status === 'triggered').length;
    const healthyClusters = clusters.filter(c => c.status === 'healthy').length;

    const { avgCpuUsage, avgMemoryUsage } = useMemo(() => {
        if (!clusters || clusters.length === 0) {
            return { avgCpuUsage: 0, avgMemoryUsage: 0 };
        }
        const totalCpu = clusters.reduce((acc, c) => acc + c.cpuUsage, 0);
        const totalMem = clusters.reduce((acc, c) => acc + c.memoryUsage, 0);
        return {
            avgCpuUsage: Math.round(totalCpu / clusters.length),
            avgMemoryUsage: Math.round(totalMem / clusters.length),
        }
    }, [clusters]);

    return (
        <div>
            <OnboardingTour run={runTour} setRun={setRunTour} />
            <PageHeader
                title="Dashboard"
                description="Welcome to your AmberOps Console."
                actions={(
                    <Button onClick={() => setRunTour(true)}>
                        <Rocket className="mr-2 h-4 w-4" />
                        Start Tour
                    </Button>
                )}
            />
            <div id="summary-cards" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clusters</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoadingClusters ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{totalClusters}</div>}
                        <p className="text-xs text-muted-foreground">{healthyClusters} healthy</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                        <Siren className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         {isLoadingAlerts ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{totalAlerts}</div>}
                        <p className="text-xs text-muted-foreground text-red-500">Immediate attention needed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. CPU Usage</CardTitle>
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoadingClusters ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{avgCpuUsage}%</div> }
                        <Progress value={avgCpuUsage} className="h-2 mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Memory Usage</CardTitle>
                        <MemoryStick className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoadingClusters ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{avgMemoryUsage}%</div> }
                        <Progress value={avgMemoryUsage} className="h-2 mt-2" />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-6 mt-6 lg:grid-cols-2">
                <Card id="cluster-status-card" className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Cluster Status</CardTitle>
                        <CardDescription>Overview of all managed clusters.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Hosts</TableHead>
                                <TableHead>Alerts</TableHead>
                                <TableHead className="text-right">CPU</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingClusters ? (
                                     Array.from({ length: 3 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={5}><Skeleton className="h-6 w-full" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    clusters.map((cluster) => (
                                    <TableRow key={cluster.id}>
                                        <TableCell>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(cluster.status)}`} />
                                                        <span className="capitalize">{cluster.status}</span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Cluster status: {cluster.status}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/clusters/${cluster.id}`} className="font-medium hover:underline truncate block max-w-[150px]">
                                                        {cluster.name}
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{cluster.name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{cluster.hostCount}</TableCell>
                                        <TableCell>{cluster.alertCount}</TableCell>
                                        <TableCell className="text-right">{cluster.cpuUsage}%</TableCell>
                                    </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Critical Alerts</CardTitle>
                        <CardDescription>Alerts that require immediate attention.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Severity</TableHead>
                                <TableHead>Alert</TableHead>
                                <TableHead>Cluster</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingAlerts ? (
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={3}><Skeleton className="h-6 w-full" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                alerts.filter(a => a.status === 'triggered').slice(0, 4).map((alert) => (
                                <TableRow key={alert.id}>
                                    <TableCell>
                                        <Badge variant={getSeverityBadgeVariant(alert.severity)}>{alert.severity}</Badge>
                                    </TableCell>
                                    <TableCell>
                                         <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link href={`/alerts/${alert.id}`} className="font-medium hover:underline truncate block max-w-[150px]">
                                                    {alert.name}
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{alert.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="truncate block max-w-[150px]">{alert.clusterName}</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{alert.clusterName}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                                )))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="outline" size="sm" className="ml-auto gap-1">
                            <Link href="/alerts">
                            View All Alerts <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
             <div id="ai-summary-card" className="grid gap-6 mt-6">
                 <Card>
                    <CardHeader className="flex flex-row justify-between items-start">
                        <div>
                        <CardTitle>AI Health Summary</CardTitle>
                        <CardDescription>
                            Select a cluster to generate an AI-powered health summary.
                        </CardDescription>
                        </div>
                        {isLoadingClusters ? (
                            <Skeleton className="h-10 w-[280px]" />
                        ) : (
                            <Select onValueChange={handleClusterChange} value={selectedCluster?.id}>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select a cluster" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clusters.map(cluster => (
                                        <SelectItem key={cluster.id} value={cluster.id}>{cluster.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </CardHeader>
                    <CardContent>
                         {selectedCluster && <ClusterHealthSummary cluster={selectedCluster} />}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

    