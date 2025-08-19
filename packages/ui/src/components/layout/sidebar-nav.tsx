
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Server,
  HardDrive,
  Siren,
  FileText,
  ListChecks,
  ScrollText,
  Settings,
  AlertCircle,
  Laptop,
  History,
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

export function SidebarNav() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
    { href: '/clusters', label: 'Clusters', icon: Server, tooltip: 'Clusters' },
    { href: '/services', label: 'Services', icon: HardDrive, tooltip: 'Services' },
    { href: '/hosts', label: 'Hosts', icon: Laptop, tooltip: 'Hosts' },
    {
      label: 'Alerts',
      icon: Siren,
      tooltip: 'Alerts',
      subItems: [
        { href: '/alerts', label: 'Current Alerts', tooltip: 'Current Alerts' },
        { href: '/alerts/definitions', label: 'Definitions', tooltip: 'Alert Definitions' },
      ],
    },
    { href: '/config', label: 'Configuration', icon: FileText, tooltip: 'Configuration' },
    { href: '/tasks', label: 'Tasks / Ops', icon: ListChecks, tooltip: 'Tasks & Ops' },
    { href: '/activity', label: 'Activity', icon: History, tooltip: 'Activity Log' },
    { href: '/logs', label: 'Logs', icon: ScrollText, tooltip: 'Logs' },
  ];

  const bottomNavItems = [
    { href: '/settings', label: 'Settings', icon: Settings, tooltip: 'Settings' },
    { href: '/help', label: 'Help', icon: AlertCircle, tooltip: 'Help' },
  ];


  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isAlertsActive = isActive('/alerts');

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
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              {item.subItems ? (
                 <Accordion type="single" collapsible defaultValue={isAlertsActive ? "alerts" : undefined} disabled={sidebarState === 'collapsed'}>
                    <AccordionItem value="alerts" className="border-b-0">
                      <AccordionTrigger asChild>
                         <SidebarMenuButton
                          isActive={isAlertsActive}
                          tooltip={item.tooltip}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </AccordionTrigger>
                      <AccordionContent className="p-0 pl-7 pt-1 group-data-[state=collapsed]:hidden">
                        <ul className="space-y-1">
                          {item.subItems.map(subItem => (
                            <li key={subItem.href}>
                               <SidebarMenuButton size="sm" isActive={pathname === subItem.href} asChild tooltip={subItem.tooltip}>
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
                <SidebarMenuButton isActive={isActive(item.href)} asChild tooltip={item.tooltip}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="p-2">
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton isActive={isActive(item.href)} asChild tooltip={item.tooltip}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
