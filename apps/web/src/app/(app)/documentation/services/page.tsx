
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { HardDrive, Play, Square, RefreshCw, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function ServicesDocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Service Management Guide"
        description="Learn how to manage services like HDFS, YARN, and more."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <HardDrive className="h-6 w-6 text-primary" />
                <CardTitle>Services Overview</CardTitle>
            </div>
            <CardDescription>
              The main <Link href="/services" className="font-semibold text-primary hover:underline">Services</Link> page provides a centralized view of all services running across all your clusters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h4 className="font-semibold text-md mb-2">Service List & Cards</h4>
                <p className="text-muted-foreground mb-2">
                    Similar to the clusters page, you can toggle between a detailed table and a more compact card view. Each service entry displays:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                        <b>Name & Status:</b> The service's name (e.g., HDFS) and its current status (Started, Stopped, Maintenance), accompanied by a status icon.
                    </li>
                    <li>
                        <b>Cluster Info:</b> The name of the cluster the service belongs to.
                    </li>
                     <li>
                        <b>Version & Host Count:</b> The service's software version and the number of hosts it's running on.
                    </li>
                </ul>
             </div>
             <div>
                <h4 className="font-semibold text-md mb-2">Service Actions</h4>
                 <p className="text-muted-foreground mb-2">
                    You can perform actions on services directly from the list view using the "More actions" dropdown, or from the detail page. Actions include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><Play className="inline-block h-4 w-4" /> <b>Start:</b> Start a stopped service.</li>
                    <li><Square className="inline-block h-4 w-4" /> <b>Stop:</b> Stop a running service.</li>
                    <li><RefreshCw className="inline-block h-4 w-4" /> <b>Restart:</b> Restart a running service.</li>
                </ul>
                 <p className="text-muted-foreground mt-2">
                    Performing any of these actions will create a new entry on the <Link href="/tasks" className="font-semibold text-primary hover:underline">Tasks / Ops</Link> page where you can track its progress.
                 </p>
             </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <HardDrive className="h-6 w-6 text-primary" />
                <CardTitle>Service Detail Page</CardTitle>
            </div>
            <CardDescription>
              Clicking "View" on any service navigates to its dedicated detail page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h4 className="font-semibold text-md mb-2">Key Components</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                        <b>Service Status Card:</b> A prominent display of the service's current status and version.
                    </li>
                     <li>
                        <b>Quick Links Card:</b> Provides direct links to view the service's configurations, run a service check, or view its metrics.
                    </li>
                    <li>
                        <b>Service Hosts Table:</b> A table listing all hosts that are running components of this service.
                    </li>
                </ul>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    