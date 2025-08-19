
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@amberops/ui/components/ui/tabs';
import { GeneralSettings } from '@/components/general-settings';
import { IntegrationsSettings } from '@/components/integrations-settings';
import { ApiAccessSettings } from '@/components/api-access-settings';

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage application settings and integrations."
      />
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="integrations" className="space-y-6">
          <IntegrationsSettings />
        </TabsContent>
        <TabsContent value="api">
          <ApiAccessSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
