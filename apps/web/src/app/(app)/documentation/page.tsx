
'use client';

import Link from 'next/link';
import { PageHeader } from '@amberops/ui/components/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { ArrowUpRight, BookOpen, LayoutDashboard, Server, Siren, Settings, Wand2, Table, HardDrive } from 'lucide-react';

const docSections = [
    {
        title: 'Dashboard Guide',
        description: 'Understand the main dashboard, summary cards, and the AI Health Summary widget.',
        href: '/documentation/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Cluster & Host Management',
        description: 'Learn how to add, view, and manage your clusters and their associated hosts.',
        href: '/documentation/clusters',
        icon: Server,
    },
    {
        title: 'Service Management',
        description: 'Guides on how to manage services like HDFS and YARN, including actions like start, stop, and restart.',
        href: '/documentation/services',
        icon: HardDrive,
    },
    {
        title: 'Alerting System',
        description: 'A deep dive into viewing alerts, acknowledging them, and creating new alert definitions.',
        href: '/documentation/alerts',
        icon: Siren,
    },
     {
        title: 'Advanced Data Tables',
        description: 'Master the powerful features of our data tables: sorting, filtering, customizing columns, and exporting data.',
        href: '/documentation/advanced-features',
        icon: Table,
    },
    {
        title: 'AI-Powered Assistance',
        description: 'Learn about the AI features integrated into AmberOps, like troubleshooting and health summaries.',
        href: '/documentation/advanced-features',
        icon: Wand2,
    },
    {
        title: 'Settings & User Management',
        description: 'Instructions on how to manage users, roles, API keys, and third-party integrations.',
        href: '/documentation/settings',
        icon: Settings,
    },
]


export default function DocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Documentation"
        description="A comprehensive guide to the AmberOps Console."
      />

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docSections.map((section) => (
            <Card key={section.title} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <section.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{section.title}</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{section.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Link href={section.href} className="text-sm font-medium text-primary hover:underline flex items-center">
                        Read More <ArrowUpRight className="h-4 w-4 ml-1"/>
                    </Link>
                </CardFooter>
            </Card>
        ))}
       </div>
    </div>
  );
}

    