
'use client';

import { AmberOpsLogo } from '@amberops/ui/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@amberops/ui/components/ui/sidebar';
import { useSidebar } from '@amberops/ui/hooks/use-sidebar';
import {
  FileText,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  MessageSquare,
  Shield,
  Tag,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

export function AdminSidebarNav() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();
  const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
  const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost';

  const handleSignOut = () => {
    // Clear the HttpOnly cookie by setting an expired date
    document.cookie = `amberops_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${cookieDomain};`;
    // Clear the user data from local storage
    localStorage.removeItem('amberops_user');
    toast.success('Successfully logged out!');
    window.location.href = `${homeUrl}/auth`;
  };

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      testid: 'sidebar-dashboard',
    },
    { href: '/users', label: 'Users', icon: Users, testid: 'sidebar-users' },
    {
      href: '/documentation',
      label: 'Documentation',
      icon: FileText,
      testid: 'sidebar-documentation',
    },
    {
      href: '/legal',
      label: 'Legal Pages',
      icon: Shield,
      testid: 'sidebar-legal',
    },
    {
      href: '/pricing',
      label: 'Pricing',
      icon: Tag,
      testid: 'sidebar-pricing',
    },
    {
      href: '/testimonials',
      label: 'Testimonials',
      icon: MessageSquare,
      testid: 'sidebar-testimonials',
    },
    { href: '/faqs', label: 'FAQs', icon: ListOrdered, testid: 'sidebar-faqs' },
  ];

  const bottomNavItems = [
    {
      action: handleSignOut,
      label: 'Exit Admin',
      icon: LogOut,
      testid: 'sidebar-exit-admin',
    },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2"
          data-testid="sidebar-logo-link"
        >
          <AmberOpsLogo className="h-8 w-8" />
          {sidebarState === 'expanded' && (
            <h1 className="font-headline text-xl font-semibold">
              AmberOps Admin
            </h1>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex-1 p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                isActive={isActive(item.href)}
                asChild
                tooltip={item.label}
                data-testid={item.testid}
              >
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
              <SidebarMenuButton
                onClick={item.action}
                tooltip={item.label}
                data-testid={item.testid}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
