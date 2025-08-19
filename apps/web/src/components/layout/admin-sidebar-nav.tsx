
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Shield,
  Users,
  LogOut,
  Tag,
  MessageSquare,
  ListOrdered,
} from 'lucide-react';
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

export function AdminSidebarNav() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();
  const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/documentation', label: 'Documentation', icon: FileText },
    { href: '/admin/legal', label: 'Legal Pages', icon: Shield },
    { href: '/admin/pricing', label: 'Pricing', icon: Tag },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/admin/faqs', label: 'FAQs', icon: ListOrdered },
  ];

  const bottomNavItems = [
    { href: '/dashboard', label: 'Exit Admin', icon: LogOut },
  ];


  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={homeUrl} className="flex items-center gap-2">
            <AmberOpsLogo className="w-8 h-8"/>
            {sidebarState === 'expanded' && <h1 className="text-xl font-headline font-semibold">AmberOps Admin</h1>}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex-1 p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
                <SidebarMenuButton isActive={isActive(item.href)} asChild tooltip={item.label}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="p-2">
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton isActive={isActive(item.href)} asChild tooltip={item.label}>
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
