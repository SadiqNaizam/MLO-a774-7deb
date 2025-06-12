import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Assumes a utility for classnames
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  children?: NavItem[]; // For nested navigation
}

interface SidebarProps {
  navItems: NavItem[];
  className?: string;
  logo?: React.ReactNode; // Optional logo/brand element at the top
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, className, logo }) => {
  const location = useLocation();
  console.log("Rendering Sidebar with navItems:", navItems.length);

  const renderNavItems = (items: NavItem[], isChild = false) => {
    return items.map((item, index) => (
      <li key={`${item.to}-${index}`} className="space-y-1">
        {item.external ? (
          <a
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'w-full justify-start',
              isChild && 'pl-8',
              item.disabled && 'cursor-not-allowed opacity-80'
            )}
          >
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
            {item.label}
          </a>
        ) : (
          <Link
            to={item.to}
            className={cn(
              buttonVariants({ variant: location.pathname === item.to ? 'secondary' : 'ghost' }),
              'w-full justify-start',
              isChild && 'pl-8',
              item.disabled && 'cursor-not-allowed opacity-80'
            )}
            aria-disabled={item.disabled}
            tabIndex={item.disabled ? -1 : undefined}
          >
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
            {item.label}
          </Link>
        )}
        {item.children && item.children.length > 0 && (
          <ul className="pl-4 space-y-1">
            {renderNavItems(item.children, true)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <aside className={cn("hidden border-r bg-muted/40 md:block", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        {logo && (
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            {logo}
          </div>
        )}
        <ScrollArea className="flex-1 py-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <ul className="space-y-1">
              {renderNavItems(navItems)}
            </ul>
          </nav>
        </ScrollArea>
        {/* Optional: Add a footer section to the sidebar */}
        {/* <div className="mt-auto p-4"> ... </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;