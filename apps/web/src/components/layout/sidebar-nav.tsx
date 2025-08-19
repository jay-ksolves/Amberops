
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Server,
  HardDrive,
  FileText,
  ListChecks,
  ScrollText,
  Settings,
  AlertCircle,
  Laptop,
  History,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@amberops/ui/components/ui/accordion';
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@amberops/ui/components/ui/sidebar';
import { useSidebar } from '@amberops/ui/hooks/use-sidebar';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { cn } from '@amberops/lib';

export function SidebarNav() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard', testid: 'sidebar-dashboard' },
    { href: '/clusters', label: 'Clusters', icon: Server, tooltip: 'Clusters', testid: 'sidebar-clusters' },
    { href: '/services', label: 'Services', icon: HardDrive, tooltip: 'Services', testid: 'sidebar-services' },
    { href: '/hosts', label: 'Hosts', icon: Laptop, tooltip: 'Hosts', testid: 'sidebar-hosts' },
    {
      label: 'Alerts',
      icon: AlertTriangle,
      tooltip: 'Alerts',
      testid: 'sidebar-alerts',
      subItems: [
        { href: '/alerts', label: 'Current Alerts', tooltip: 'Current Alerts', testid: 'sidebar-alerts-current' },
        { href: '/alerts/definitions', label: 'Definitions', tooltip: 'Alert Definitions', testid: 'sidebar-alerts-definitions' },
      ],
    },
    { href: '/config', label: 'Configuration', icon: FileText, tooltip: 'Configuration', testid: 'sidebar-config' },
    { href: '/tasks', label: 'Tasks / Ops', icon: ListChecks, tooltip: 'Tasks & Ops', testid: 'sidebar-tasks' },
    { href: '/activity', label: 'Activity', icon: History, tooltip: 'Activity Log', testid: 'sidebar-activity' },
    { href: '/logs', label: 'Logs', icon: ScrollText, tooltip: 'Logs', testid: 'sidebar-logs' },
  ];

  const bottomNavItems = [
    { href: '/documentation', label: 'Documentation', icon: BookOpen, tooltip: 'Documentation', testid: 'sidebar-documentation' },
    { href: '/settings', label: 'Settings', icon: Settings, tooltip: 'Settings', testid: 'sidebar-settings' },
    { href: '/help', label: 'Help', icon: AlertCircle, tooltip: 'Help', testid: 'sidebar-help' },
  ];


  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isAlertsActive = isActive('/alerts');
  const isDocsActive = isActive('/documentation');

  const renderNavMenu = (items: any[]) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.label}>
        {item.subItems ? (
          <Accordion 
            type="single" 
            collapsible 
            defaultValue={
              (item.label === 'Alerts' && isAlertsActive) ? "accordion-item" : 
              (item.label === 'Documentation' && isDocsActive) ? "accordion-item" : undefined
            }
            disabled={sidebarState === 'collapsed'}
          >
              <AccordionItem value="accordion-item" className="border-b-0">
                <SidebarMenuButton
                    asChild
                    isActive={item.subItems.some((sub: any) => pathname.startsWith(sub.href))}
                    tooltip={item.tooltip}
                    className="p-0"
                >
                    <AccordionTrigger className="p-2" data-testid={item.testid}>
                        <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span className="group-data-[state=collapsed]:hidden">{item.label}</span>
                        </div>
                    </AccordionTrigger>
                </SidebarMenuButton>
                <AccordionContent className="p-0 pl-7 pt-1 group-data-[state=collapsed]:hidden">
                  <ul className="space-y-1">
                    {item.subItems.map((subItem: any) => (
                      <li key={subItem.href}>
                         <SidebarMenuButton size="sm" isActive={pathname === subItem.href} asChild tooltip={subItem.tooltip} data-testid={subItem.testid}>
                          <Link href={subItem.href}>
                            <span>{subItem.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
          </Accordion>
        ) : (
          <SidebarMenuButton isActive={isActive(item.href)} asChild tooltip={item.tooltip} data-testid={item.testid}>
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    ))
  }


  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <AmberOpsLogo className="w-8 h-8"/>
            {sidebarState === 'expanded' && <h1 className="text-xl font-headline font-semibold">AmberOps</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex-1 p-2">
          {renderNavMenu(navItems)}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="p-2">
          {renderNavMenu(bottomNavItems)}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
