
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Book, BookmarkCheck, Building, Calendar, Home, Settings, Users, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AppSidebar = () => {
  const {
    user,
    logout
  } = useAuth();
  const location = useLocation();
  const navItems = [{
    name: "Dashboard",
    path: "/",
    icon: <Home className="h-5 w-5" />
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
  
  return <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-border bg-background transition-all duration-300">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Home className="h-5 w-5 text-primary" />
          <span className="text-primary">CRM4SMEs</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-auto p-6">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={item.path}>
              <Link to={item.path} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground", location.pathname === item.path && "bg-accent text-accent-foreground font-medium")}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {user && <div className="mt-auto border-t border-border p-6">
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
                  <Button variant="outline" className="w-full text-sm" onClick={() => window.open('mailto:support@crm4smes.com')}>
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

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="truncate font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
            Sign Out
          </button>
        </div>}
    </aside>;
};

export default AppSidebar;
