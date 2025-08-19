
'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@amberops/ui/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@amberops/ui/components/ui/dropdown-menu';
import { Button } from '@amberops/ui/components/ui/button';
import {
  SidebarTrigger,
} from '@amberops/ui/components/ui/sidebar';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@amberops/ui/components/ui/tooltip';

import { ThemeToggle } from '@amberops/ui/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { QuickAccessNav } from '@amberops/ui/components/quick-access-nav';
import '@amberops/ui/styles/quick-access-nav.css';
import { GlobalSearch } from '@/components/global-search';
import { useEffect, useState } from 'react';

type User = {
  name: string;
  email: string;
  role: string;
  avatar: string;
};

export function AppLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3003';
    const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
    const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost';

    useEffect(() => {
        const storedUser = localStorage.getItem('amberops_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSignOut = () => {
        // Clear local storage
        localStorage.removeItem('amberops_user');
        localStorage.removeItem('amberops_jwt');
        
        // Clear the HttpOnly cookie by setting an expired date (best effort, may not work from JS)
        document.cookie = `amberops_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${cookieDomain};`;

        toast.success('Successfully logged out!');
        window.location.href = `${homeUrl}/auth`;
    }

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 py-2 backdrop-blur-lg sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="sm:hidden" data-testid="sidebar-toggle-mobile"/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Menu</p>
          </TooltipContent>
        </Tooltip>
        
        <div className="flex flex-1 items-center justify-center gap-4">
           <GlobalSearch />
           <QuickAccessNav />
        </div>
        
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
                aria-label="Open user menu"
                data-testid="user-menu-button"
              >
                <Avatar>
                  <AvatarImage
                    src={user?.avatar || ''}
                    alt={user?.name || ''}
                  />
                  <AvatarFallback>{user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" data-testid="user-menu-dropdown">
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
               {user?.role === 'Admin' && (
                <DropdownMenuItem asChild data-testid="admin-dashboard-link">
                    <a href={adminUrl}>Admin Dashboard</a>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild data-testid="settings-link">
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild data-testid="support-link">
                <Link href="/help">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                data-testid="logout-button"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="relative flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
