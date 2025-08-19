
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@amberops/ui/components/ui/alert';
import { Bot, Rocket, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardDocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard Guide"
        description="Your central hub for monitoring the overall health of your infrastructure."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              The Dashboard is the first page you see upon logging in. It's designed to give you a high-level, at-a-glance overview of the status of all your managed clusters and critical system metrics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h4 className="font-semibold text-md mb-2">Key Components</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                        <b>Summary Cards:</b> At the top of the page, these four cards provide immediate insight into your most important metrics: Total Clusters, Active Alerts, Average CPU Usage, and Average Memory Usage. They help you quickly assess if any area requires immediate attention.
                    </li>
                    <li>
                        <b>Cluster Status Table:</b> This table provides a quick, sortable overview of every cluster you manage. You can see each cluster's health status, host count, and active alert count. Clicking on any cluster's name will take you directly to its detailed view page.
                    </li>
                     <li>
                        <b>Critical Alerts Table:</b> This shows a filtered list of the most recent and critical alerts that require immediate attention. It's a quick way to see the most pressing issues without having to navigate to the full alerts page.
                    </li>
                </ul>
             </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-primary" />
                    <CardTitle>AI Health Summary</CardTitle>
                </div>
                <CardDescription>
                    This powerful widget uses generative AI to provide a natural-language summary of a selected cluster's health.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <h4 className="font-semibold text-md mb-2">How it Works</h4>
                     <p className="text-muted-foreground">
                        The AI agent analyzes the cluster's current health metrics (CPU, Memory, Disk) and all its active alerts. It then generates a concise, human-readable summary that highlights potential risks, identifies root causes of problems, and gives you a clear picture of the cluster's state.
                     </p>
                </div>
                 <div>
                    <h4 className="font-semibold text-md mb-2">How to Use It</h4>
                     <p className="text-muted-foreground">
                        Simply select a cluster from the dropdown menu at the top-right of the card. The AI will automatically analyze the data and generate a new summary for the selected cluster.
                     </p>
                </div>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Experimental Feature</AlertTitle>
                    <AlertDescription>
                        AI features are powered by large language models and may sometimes provide inaccurate information. Always verify critical information against the raw metrics and logs.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <Rocket className="h-6 w-6 text-primary" />
                    <CardTitle>User Onboarding Tour</CardTitle>
                </div>
                <CardDescription>
                    Learn the layout of the dashboard quickly with the integrated user tour.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <p className="text-muted-foreground">
                    If it's your first time visiting the dashboard, an automated tour will start, guiding you through the key elements of the page. You can restart this tour at any time by clicking the "Start Tour" button in the page header.
                 </p>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}

    