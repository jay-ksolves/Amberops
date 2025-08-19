
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Server, Laptop, PlusCircle, AreaChart, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function ClustersDocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Cluster & Host Management"
        description="Learn how to add, view, and manage your clusters and their associated hosts."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <Server className="h-6 w-6 text-primary" />
                <CardTitle>Clusters Overview</CardTitle>
            </div>
            <CardDescription>
              The main <Link href="/clusters" className="font-semibold text-primary hover:underline">Clusters</Link> page is your command center for all cluster-related operations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h4 className="font-semibold text-md mb-2">Cluster List & Cards</h4>
                <p className="text-muted-foreground mb-2">
                    By default, you'll see a detailed table view of all your clusters. You can switch to a more visual Card view using the layout toggle buttons in the top right. Both views provide key information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                        <b>Name & Status:</b> The cluster's name and its current health status (Healthy, Degraded, Unhealthy), indicated by a colored badge.
                    </li>
                    <li>
                        <b>Resource Usage:</b> Quick insights into host count, service count, and active alerts.
                    </li>
                </ul>
             </div>
             <div>
                <h4 className="font-semibold text-md mb-2">Adding a New Cluster</h4>
                <p className="text-muted-foreground">
                    Clicking the <PlusCircle className="inline-block h-4 w-4" /> "Add Cluster" button opens a multi-step wizard to register a new Ambari cluster. You will be guided through providing the cluster name, Ambari URL, and the necessary credentials.
                </p>
             </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <Server className="h-6 w-6 text-primary" />
                <CardTitle>Cluster Detail Page</CardTitle>
            </div>
            <CardDescription>
              Clicking on any cluster from the list or card view navigates you to its detailed dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h4 className="font-semibold text-md mb-2">Key Components</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                        <b>Summary Cards:</b> A top-level overview of the cluster's status, CPU/memory usage, and active alert count.
                    </li>
                     <li>
                        <b>Resource Utilization Charts:</b>
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li><AreaChart className="inline-block h-4 w-4" /> An area chart showing historical trends for CPU and Memory usage over the last 30 days.</li>
                            <li><BarChart className="inline-block h-4 w-4" /> An area chart displaying I/O performance for Disk and Network.</li>
                        </ul>
                    </li>
                    <li>
                        <b>Services Table:</b> A list of all services running on the cluster, their status, and version. You can click "View" to navigate to the service detail page.
                    </li>
                    <li>
                        <b>Hosts Table:</b> A list of all hosts within the cluster, their IP addresses, and health status.
                    </li>
                     <li>
                        <b>Active Alerts Card:</b> A focused view of any currently triggered alerts for this specific cluster.
                    </li>
                </ul>
             </div>
          </CardContent>
        </Card>

         <Card>
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <Laptop className="h-6 w-6 text-primary" />
                    <CardTitle>Host Management</CardTitle>
                </div>
                <CardDescription>
                    The global <Link href="/hosts" className="font-semibold text-primary hover:underline">Hosts</Link> page lists every host across all your clusters, while the Host Detail page gives you specific insights.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <p className="text-muted-foreground">
                    From the Host Detail page, you can view the host's status, OS, CPU, memory, and storage metrics. It also lists all the service components currently running on that specific host. Actions like rebooting the host can also be initiated from here.
                 </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    