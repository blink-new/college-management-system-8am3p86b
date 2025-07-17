import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Settings,
  GraduationCap,
  UserCheck,
  Bell,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  userRole: 'student' | 'admin' | 'staff';
  className?: string;
}

const navigationItems = {
  student: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', href: '/courses', icon: BookOpen },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Academic Records', href: '/records', icon: FileText },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ],
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/users', icon: Users },
    { name: 'Course Management', href: '/courses', icon: BookOpen },
    { name: 'Schedules', href: '/schedule', icon: Calendar },
    { name: 'Academic Records', href: '/records', icon: FileText },
    { name: 'Staff Management', href: '/staff', icon: UserCheck },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  staff: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', href: '/courses', icon: BookOpen },
    { name: 'Students', href: '/students', icon: GraduationCap },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Academic Records', href: '/records', icon: FileText },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ],
};

export function Sidebar({ userRole, className }: SidebarProps) {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const items = navigationItems[userRole] || [];

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <GraduationCap className="h-8 w-8 text-primary" />
        <span className="ml-2 text-lg font-semibold">CollegeMS</span>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 py-4">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileOpen(false)}
              >
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4">
        <div className="rounded-lg bg-primary/5 p-3">
          <p className="text-sm font-medium">Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-background border-r">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={cn('hidden md:flex h-full w-64 flex-col border-r bg-background', className)}>
        <SidebarContent />
      </div>
    </>
  );
}