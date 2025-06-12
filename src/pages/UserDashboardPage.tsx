import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar, { NavItem } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Home, Settings, BarChart2, Users, ShoppingBag, LucideIcon } from 'lucide-react';

const UserDashboardPage: React.FC = () => {
  console.log('UserDashboardPage loaded');

  const sidebarNavItems: NavItem[] = [
    { to: '/dashboard', label: 'Overview', icon: Home as LucideIcon },
    { to: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 as LucideIcon },
    { to: '/dashboard/orders', label: 'Orders', icon: ShoppingBag as LucideIcon, disabled: true },
    { to: '/dashboard/customers', label: 'Customers', icon: Users as LucideIcon },
    {
      to: '/dashboard/settings',
      label: 'Settings',
      icon: Settings as LucideIcon,
      children: [
        { to: '/dashboard/settings/profile', label: 'Profile' },
        { to: '/dashboard/settings/billing', label: 'Billing', disabled: true },
      ],
    },
  ];

  const user = {
    name: 'Alice Wonderland',
    email: 'alice.w@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice', // Placeholder avatar
  };
  
  const handleLogout = () => {
    console.log("User logged out (simulated)");
    // In a real app, clear tokens and navigate to login
    // navigate('/login');
  };


  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header 
        appName="My Dashboard" 
        user={user} 
        isAuthenticated={true}
        onLogout={handleLogout}
      />
      <div className="flex flex-1">
        <Sidebar navItems={sidebarNavItems} logo={<Link to="/dashboard" className="font-bold text-lg">AppLogo</Link>} />
        <main className="flex-1 flex flex-col p-4 sm:p-6 gap-4 sm:gap-6">
          <NavigationMenu className="hidden md:flex justify-start">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard/overview" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Overview
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/dashboard/reports" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Reports
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/dashboard/integrations" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Integrations
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ScrollArea className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome, {user.name}!</CardTitle>
                  <CardDescription>Here's a quick overview of your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <p>This is your main dashboard area. More widgets and information will be added here.</p>
                  <Button>View Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>What's new in your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>Logged in successfully.</li>
                    <li>Updated profile picture.</li>
                    <li>Viewed analytics report.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                  <Button variant="outline">Create New Report</Button>
                  <Button variant="outline">Manage Users</Button>
                  <Button variant="outline">Go to Settings</Button>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardPage;