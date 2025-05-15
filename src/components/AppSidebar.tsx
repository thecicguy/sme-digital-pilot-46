
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Users, Briefcase, ClipboardCheck, Mail, FileText, 
  Settings, LogOut, ChevronLeft, ChevronRight, User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    {
      name: "Clients",
      icon: <Users className="h-5 w-5" />,
      path: "/clients",
      role: ["service_provider", "client_contact"],
    },
    {
      name: "Projects",
      icon: <Briefcase className="h-5 w-5" />,
      path: "/projects",
      role: ["service_provider", "client_contact"],
    },
    {
      name: "Tasks",
      icon: <ClipboardCheck className="h-5 w-5" />,
      path: "/tasks",
      role: ["service_provider", "client_contact"],
    },
    {
      name: "Email Templates",
      icon: <Mail className="h-5 w-5" />,
      path: "/email-templates",
      role: ["service_provider"],
    },
    {
      name: "Reports",
      icon: <FileText className="h-5 w-5" />,
      path: "/reports",
      role: ["service_provider"],
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
      role: ["service_provider"],
    },
  ];

  // Filter navItems based on user role
  const filteredNavItems = user 
    ? navItems.filter(item => item.role.includes(user.role))
    : [];

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col border-r bg-sidebar border-sidebar-border">
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <div className="text-xl font-semibold text-sidebar-foreground">
              CRM for SMEs
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "ml-auto h-8 w-8",
              collapsed && "mx-auto"
            )}
            onClick={toggleSidebar}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-3">
          <nav className="space-y-1">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sidebar-foreground transition-all",
                  location.pathname.startsWith(item.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50",
                  collapsed && "justify-center px-2"
                )}
              >
                {item.icon}
                {!collapsed && (
                  <span className="ml-3 text-sm font-medium">{item.name}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-sidebar-border p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={user?.name} />
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="truncate text-sm font-medium text-sidebar-foreground">
                  {user?.name}
                </div>
                <div className="truncate text-xs text-sidebar-foreground/60">
                  {user?.email}
                </div>
              </div>
            )}
          </div>

          <div className="mt-3">
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              className={cn(
                "text-sidebar-foreground w-full justify-start hover:bg-sidebar-accent/50",
                collapsed && "justify-center"
              )}
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
