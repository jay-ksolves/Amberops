
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { User, Settings, GitMerge, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function SettingsDocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Settings Guide"
        description="Instructions on how to manage users, roles, API keys, and third-party integrations."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
             <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                <CardTitle>Settings Page Overview</CardTitle>
            </div>
            <CardDescription>
              The <Link href="/settings" className="font-semibold text-primary hover:underline">Settings</Link> page is organized into tabs for easy access to different configuration areas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <h4 className="font-semibold text-md mb-2 flex items-center gap-2"><User className="h-5 w-5" />User Management</h4>
                <p className="text-muted-foreground">
                    This tab allows you to manage all users who have access to the AmberOps Console. You can add new users, edit existing user details (name, email, and role), and delete users. Roles include Viewer, Operator, and Admin, each with different levels of permissions.
                </p>
            </div>
             <div>
                <h4 className="font-semibold text-md mb-2 flex items-center gap-2"><GitMerge className="h-5 w-5" />Integrations</h4>
                <p className="text-muted-foreground">
                    Connect AmberOps to your other tools. From this tab, you can enable or disable integrations with services like Slack (for notifications) and PagerDuty (for critical alerts).
                </p>
            </div>
             <div>
                <h4 className="font-semibold text-md mb-2 flex items-center gap-2"><KeyRound className="h-5 w-5" />API Access</h4>
                <p className="text-muted-foreground">
                    For programmatic access and automation, you can generate and manage API keys from this tab. Give each key a descriptive name to track its usage. You can revoke keys at any time.
                </p>
            </div>
             <div>
                <h4 className="font-semibold text-md mb-2">General Settings</h4>
                <p className="text-muted-foreground">
                   This tab contains basic profile and application settings. You can update your name and email, and most importantly, select your preferred application theme (Light, Dark, or System).
                </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    