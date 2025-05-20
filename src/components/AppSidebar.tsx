
import React, { useState } from "react";
import {
  Home,
  Users,
  Briefcase,
  CheckSquare,
  Calendar as CalendarIcon,
  BarChart3,
  FolderArchive,
  Settings,
  Timer
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      protected: true
    },
    {
      href: "/clients",
      label: "Clients",
      icon: <Users className="h-5 w-5" />,
      protected: true
    },
    {
      href: "/projects",
      label: "Projects",
      icon: <Briefcase className="h-5 w-5" />,
      protected: true
    },
    {
      href: "/tasks",
      label: "Tasks",
      icon: <CheckSquare className="h-5 w-5" />,
      protected: true
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: <CalendarIcon className="h-5 w-5" />,
      protected: true
    },
    {
      href: "/timetracking",
      label: "Time Tracking",
      icon: <Timer className="h-5 w-5" />,
      protected: true
    },
    {
      href: "/reports",
      label: "Reports",
      icon: <BarChart3 className="h-5 w-5" />,
      protected: true
    },
    {
      href: "/documents",
      label: "Document Store",
      icon: <FolderArchive className="h-5 w-5" />,
      protected: true
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      protected: true
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const renderNavItems = () => {
    return navItems.map((item) => {
      if (item.protected && !user) {
        return null;
      }

      return (
        <li key={item.label}>
          <Link
            to={item.href}
            className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Link>
        </li>
      );
    });
  };

  const sidebarContent = (
    <div className="flex h-full flex-col py-4">
      <Link to="/" className="px-6 pb-4">
        <h1 className="font-bold text-2xl">CRM</h1>
      </Link>
      <ul className="flex-1 space-y-1 px-2">
        {renderNavItems()}
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="mt-auto flex items-center justify-start gap-2 rounded-md px-3 py-2 text-sm font-medium shadow-none hover:bg-secondary">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span>shadcn</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side="left" className="w-3/4 sm:w-1/2 bg-white">
          <SheetHeader className="text-left">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="hidden border-r bg-gray-50 dark:bg-secondary/10 md:block w-60">
      {sidebarContent}
    </div>
  );
};

export default AppSidebar;
