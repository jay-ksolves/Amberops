
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@amberops/ui/components/ui/alert';
import { Bot, Table, SlidersHorizontal, FileDown, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AdvancedFeaturesDocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Advanced Features"
        description="Master the powerful, reusable features that make AmberOps a joy to use."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
             <div className="flex items-center gap-3">
                <Table className="h-6 w-6 text-primary" />
                <CardTitle>Advanced Data Tables</CardTitle>
            </div>
            <CardDescription>
              All tables in AmberOps are packed with features to help you find and manage your data efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <h4 className="font-semibold text-md mb-2">Key Table Features</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                        <b>Universal Filtering:</b> Use the search input above any table to instantly filter rows by the designated key (e.g., filter by name on the Clusters page).
                    </li>
                    <li>
                        <b>Three-State Sorting:</b> Click on any column header to sort the data. The sorting cycles through three states: ascending, descending, and unsorted.
                    </li>
                    <li>
                        <b>Card & List Views:</b> On pages like Clusters and Services, you can toggle between a detailed table view and a high-level card view using the <Link href="/clusters" className="font-semibold text-primary hover:underline">List/Grid toggle buttons</Link>.
                    </li>
                    <li>
                        <b>Export Data:</b> Use the <FileDown className="inline-block h-4 w-4" /> "Export" button to download the current table view as a PDF or Excel (.xlsx) file.
                    </li>
                </ul>
            </div>
            <div>
                 <div className="flex items-center gap-3 mb-2">
                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-md">View Customization</h4>
                </div>
                <p className="text-muted-foreground mb-2">
                    Click the "Customize" button to open the view customization popover. From here, you can:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                        <b>Toggle Column Visibility:</b> Use the checkboxes to show or hide specific columns.
                    </li>
                    <li>
                        <b>Reorder Columns:</b> Drag and drop columns to create a layout that suits your workflow.
                    </li>
                    <li>
                        <b>Adjust Row Density:</b> Choose between Compact, Default, or Comfortable to change the vertical spacing of rows.
                    </li>
                     <li>
                        <b>Change Table Style:</b> Select a table style like Grid, Zebra Stripes, or Minimal for different visual presentations.
                    </li>
                    <li>
                        <b>Reset View:</b> Click the "Reset View" button to instantly return all customization options to their default state.
                    </li>
                </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-primary" />
                    <CardTitle>AI-Powered Assistance</CardTitle>
                </div>
                <CardDescription>
                    AmberOps integrates generative AI to provide intelligent insights and accelerate troubleshooting.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <h4 className="font-semibold text-md mb-2">AI Health Summary</h4>
                     <p className="text-muted-foreground">
                        Available on the <Link href="/dashboard" className="font-semibold text-primary hover:underline">Dashboard</Link>, this widget analyzes a cluster's current health metrics and active alerts to generate a concise, human-readable summary, highlighting potential risks and root causes.
                     </p>
                </div>
                 <div>
                    <h4 className="font-semibold text-md mb-2">AI-Powered Troubleshooting</h4>
                     <p className="text-muted-foreground">
                        Found on the <Link href="/alerts/alert-1" className="font-semibold text-primary hover:underline">Alert Detail</Link> page, this feature analyzes the alert's description and related logs to suggest a series of actionable troubleshooting steps to help you resolve the issue faster.
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
      </div>
    </div>
  );
}

    