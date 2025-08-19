
'use client';

import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '@amberops/ui/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@amberops/ui/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@amberops/ui/components/ui/table';
import { Textarea } from '@amberops/ui/components/ui/textarea';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import { fetchConfigVersions } from '@amberops/api/client';
import { format } from 'date-fns';
import { History, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import type { ConfigVersion } from '@amberops/lib';

export default function ConfigPage() {
  const { data: configVersions = [], isLoading } = useQuery<ConfigVersion[]>({
    queryKey: ['configVersions'],
    queryFn: fetchConfigVersions,
  });

  const sampleConfig = `
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>3</value>
  </property>
  <property>
    <name>yarn.nodemanager.resource.memory-mb</name>
    <value>8192</value>
  </property>
</configuration>
`;

  const handleSaveChanges = () => {
    toast.success('Configuration saved successfully!');
  };

  const handleRollback = (version: number) => {
    toast.success(`Successfully rolled back to version ${version}.`);
  };

  return (
    <div>
      <PageHeader
        title="Configuration Editor"
        description="Manage service configurations across your clusters."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>core-site.xml</CardTitle>
                <CardDescription>Editing for Production Cluster</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => toast('Compare feature coming soon!')}
                >
                  Compare Versions
                </Button>
                <Button onClick={handleSaveChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea defaultValue={sampleConfig} className="font-mono h-96" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <CardTitle>Version History</CardTitle>
            </div>
            <CardDescription>
              Review and rollback to previous versions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ver.</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-5 w-6" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-24" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-8 w-20 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                  : configVersions.map((v) => (
                      <TableRow key={v.version}>
                        <TableCell className="font-semibold">
                          {v.version}
                        </TableCell>
                        <TableCell>{v.author}</TableCell>
                        <TableCell>{format(new Date(v.date), 'PPp')}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRollback(v.version)}
                          >
                            Rollback
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
