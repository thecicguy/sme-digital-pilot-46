
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Book, BookmarkCheck, Building, Calendar, Briefcase, Settings, Users, FileText, HelpCircle, FileIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppSidebar = () => {
  const {
    user,
    logout
  } = useAuth();
  const location = useLocation();
  const navItems = [{
    name: "Dashboard",
    path: "/",
    icon: <Briefcase className="h-5 w-5" />
  }, {
    name: "Clients",
    path: "/clients",
    icon: <Users className="h-5 w-5" />
  }, {
    name: "Projects",
    path: "/projects",
    icon: <Building className="h-5 w-5" />
  }, {
    name: "Tasks",
    path: "/tasks",
    icon: <BookmarkCheck className="h-5 w-5" />
  }, {
    name: "Calendar",
    path: "/calendar",
    icon: <Calendar className="h-5 w-5" />
  }, {
    name: "Document Store",
    path: "/documents",
    icon: <FileText className="h-5 w-5" />
  }, {
    name: "Reports",
    path: "/reports",
    icon: <FileText className="h-5 w-5" />
  }, {
    name: "Settings",
    path: "/settings",
    icon: <Settings className="h-5 w-5" />
  }];
  
  // Helper function to check if a path is active
  const isActive = (path: string) => {
    // Exact match for dashboard
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    // For other pages, check if the pathname starts with the path
    // This handles sub-routes like /clients/123
    if (path !== "/" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    logout();
  };

  return <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-border bg-background transition-all duration-300">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Briefcase className="h-5 w-5 text-primary" />
          <span className="text-primary">ConsultLink</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-auto p-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive(item.path) 
                    ? "bg-primary/10 text-primary font-medium border-l-4 border-primary" 
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {user && <div className="mt-auto border-t border-border p-6">
          {/* Template Store Button */}
          <Link to="/template-store" className="block w-full mb-4">
            <Button variant="outline" className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 flex items-center gap-2 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-800">
              <FileIcon className="h-4 w-4" />
              Template Store
            </Button>
          </Link>
          
          {/* Access Support Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full mb-4 bg-primary/10 hover:bg-primary/20 text-primary flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Access Support
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Need Help?</h4>
                <p className="text-sm text-muted-foreground">Contact our support team or check our knowledge base</p>
                <div className="space-y-2 mt-3">
                  <Button variant="outline" className="w-full text-sm" onClick={() => window.open('mailto:support@consultlink.com')}>
                    Email Support
                  </Button>
                  <Button variant="outline" className="w-full text-sm" onClick={() => window.open('tel:+18005551234')}>
                    Call Us
                  </Button>
                  <Link to="/knowledge-base" className="inline-block w-full">
                    <Button variant="outline" className="w-full text-sm">
                      Knowledge Base
                    </Button>
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
              <Avatar className="h-10 w-10 border border-primary/10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start flex-1 overflow-hidden">
                <p className="font-medium truncate w-full text-left">{user?.name || "Demo User"}</p>
                <p className="text-xs text-muted-foreground truncate w-full text-left">{user?.email || "demo@example.com"}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/settings">
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>}
    </aside>;
};

export default AppSidebar;
