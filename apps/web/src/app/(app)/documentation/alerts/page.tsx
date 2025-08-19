
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Bot, Siren, Table, ListFilter } from 'lucide-react';
import Link from 'next/link';

export default function AlertsDocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Alerting System Guide"
        description="A deep dive into viewing, managing, and defining alerts."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <Siren className="h-6 w-6 text-primary" />
                <CardTitle>Current Alerts</CardTitle>
            </div>
            <CardDescription>
              The main <Link href="/alerts" className="font-semibold text-primary hover:underline">Alerts</Link> page provides a comprehensive list of all triggered alerts across your infrastructure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h4 className="font-semibold text-md mb-2">Alert List</h4>
                <p className="text-muted-foreground mb-2">This table shows all alerts and provides the following information:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                        <b>Alert Name:</b> A descriptive name for the alert.
                    </li>
                    <li>
                        <b>Severity:</b> Critical, Warning, or Info, indicated by a colored badge.
                    </li>
                     <li>
                        <b>Status:</b> Triggered, Acknowledged, or Resolved, also shown with a colored badge.
                    </li>
                     <li>
                        <b>Cluster & Service:</b> The cluster and service where the alert originated.
                    </li>
                    <li>
                        <b>Timestamp:</b> When the alert was triggered.
                    </li>
                    <li>
                        <b>Actions:</b> A "View Details" button to navigate to the alert's detail page.
                    </li>
                </ul>
             </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
             <div className="flex items-center gap-3">
                <Siren className="h-6 w-6 text-primary" />
                <CardTitle>Alert Detail Page</CardTitle>
            </div>
            <CardDescription>
              Clicking "View Details" on an alert takes you to its dedicated page, providing in-depth context.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h4 className="font-semibold text-md mb-2">Key Sections</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                        <b>Alert Details Card:</b> Shows all metadata for the alert, such as severity, status, timestamp, cluster, and service.
                    </li>
                     <li>
                        <b>Related Logs Card:</b> Displays a snippet of relevant logs captured around the time the alert was triggered, which is crucial for initial diagnosis.
                    </li>
                    <li>
                        <b>Action Buttons:</b>
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li><b>Acknowledge:</b> Mark the alert as seen and under investigation.</li>
                            <li><b>Resolve:</b> Mark the alert as resolved after the issue has been fixed.</li>
                        </ul>
                    </li>
                    <li>
                        <b><Bot className="inline-block h-4 w-4" /> AI-Powered Troubleshooting:</b> This card on the right-hand side provides AI-suggested steps to help you resolve the alert quickly.
                    </li>
                </ul>
             </div>
          </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <ListFilter className="h-6 w-6 text-primary" />
                    <CardTitle>Alert Definitions</CardTitle>
                </div>
                <CardDescription>
                    The <Link href="/alerts/definitions" className="font-semibold text-primary hover:underline">Definitions</Link> page allows you to view and manage all alert definitions.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <p className="text-muted-foreground">
                    From here, you can see all available alert definitions, which service they monitor, and whether they are enabled. You can use the "New Definition" button to open a dialog and create a new alert to monitor your services based on metrics, port status, or script execution.
                 </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    