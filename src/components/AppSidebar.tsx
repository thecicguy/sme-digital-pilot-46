
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Book, 
  BookmarkCheck, 
  Building, 
  Calendar, 
  Contact, 
  Info, 
  Mail, 
  Settings, 
  Shield, 
  Users,
  FileText,
  Home 
} from "lucide-react";

const AppSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { 
      name: "Clients", 
      path: "/clients", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: "Projects", 
      path: "/projects", 
      icon: <Building className="h-5 w-5" /> 
    },
    { 
      name: "Tasks", 
      path: "/tasks", 
      icon: <BookmarkCheck className="h-5 w-5" /> 
    },
    { 
      name: "Email Templates", 
      path: "/email-templates", 
      icon: <Mail className="h-5 w-5" /> 
    },
    { 
      name: "Reports", 
      path: "/reports", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: "Settings", 
      path: "/settings", 
      icon: <Settings className="h-5 w-5" /> 
    },
    { 
      divider: true 
    },
    { 
      name: "About", 
      path: "/about", 
      icon: <Info className="h-5 w-5" /> 
    },
    { 
      name: "Contact", 
      path: "/contact", 
      icon: <Contact className="h-5 w-5" /> 
    },
    { 
      name: "Book Consultation", 
      path: "/booking", 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      name: "Data Privacy", 
      path: "/legal/data-privacy", 
      icon: <Shield className="h-5 w-5" /> 
    }
  ];

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-border bg-background transition-all duration-300">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Home className="h-5 w-5 text-primary" />
          <span className="text-primary">CRM for SMEs</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-auto p-6">
        <ul className="space-y-2">
          {navItems.map((item, index) => 
            item.divider ? (
              <li key={`divider-${index}`} className="my-4 border-t border-border"></li>
            ) : (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.path && "bg-accent text-accent-foreground font-medium"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      {user && (
        <div className="mt-auto border-t border-border p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="truncate font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;
