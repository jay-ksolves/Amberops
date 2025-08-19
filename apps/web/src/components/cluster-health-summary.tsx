
'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import { summarizeClusterHealth } from '@/app/actions';
import type { Cluster, Alert } from '@amberops/lib';
import { Bot } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchAlerts } from '@amberops/api/client';

interface ClusterHealthSummaryProps {
  cluster: Cluster;
}

export function ClusterHealthSummary({ cluster }: ClusterHealthSummaryProps) {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { data: allAlerts = [] } = useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
  });

  useEffect(() => {
    async function getSummary() {
      if (!cluster) return;
      try {
        setLoading(true);
        const clusterAlerts = allAlerts.filter((a) => a.clusterId === cluster.id);
        const result = await summarizeClusterHealth({
          clusterName: cluster.name,
          healthMetrics: JSON.stringify(cluster.healthMetrics),
          alerts: JSON.stringify(clusterAlerts),
        });
        setSummary(result.summary);
      } catch (error) {
        console.error('Error fetching cluster health summary:', error);
        setSummary('Could not generate health summary at this time.');
      } finally {
        setLoading(false);
      }
    }
    getSummary();
  }, [cluster, allAlerts]);

  if (!cluster) {
    return <p className="text-sm text-muted-foreground">Please select a cluster to see the summary.</p>
  }

  return (
    <>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <div className="flex items-start gap-4">
            <Bot className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
            <p className="text-sm text-muted-foreground border-l-2 border-primary pl-4">{summary}</p>
          </div>
        )}
    </>
  );
}
