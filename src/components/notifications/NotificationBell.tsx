
import { useState } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tasks, projects, clients, contacts } from "@/lib/api";
import { isToday, isTomorrow, isThisWeek, format } from "date-fns";
import { useNavigate } from "react-router-dom";

type NotificationType = "task" | "project" | "new_client" | "new_contact";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  link?: string;
}

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Generate notifications
  const generateNotifications = (): Notification[] => {
    const notifications: Notification[] = [];
    
    // Add task due notifications
    tasks
      .filter(task => 
        (isToday(new Date(task.dueDate as Date)) || 
        isTomorrow(new Date(task.dueDate as Date))) && 
        task.status !== "done"
      )
      .forEach(task => {
        notifications.push({
          id: `task-${task.id}`,
          type: "task",
          title: `Task due ${isToday(new Date(task.dueDate as Date)) ? 'today' : 'tomorrow'}`,
          description: task.description,
          timestamp: new Date(task.dueDate as Date),
          link: `/tasks?id=${task.id}`
        });
      });

    // Add project deadline notifications
    projects
      .filter(project => {
        // Calculate project end date (creation date + days allocated)
        const endDate = new Date(project.createdAt);
        endDate.setDate(endDate.getDate() + project.daysAllocated);
        return isThisWeek(endDate);
      })
      .forEach(project => {
        const endDate = new Date(project.createdAt);
        endDate.setDate(endDate.getDate() + project.daysAllocated);
        
        notifications.push({
          id: `project-${project.id}`,
          type: "project",
          title: `Project deadline approaching`,
          description: `${project.type} project ends on ${format(endDate, "MMM dd")}`,
          timestamp: endDate,
          link: `/projects/${project.id}`
        });
      });

    // Add new client notifications (clients created in the last 3 days)
    clients
      .filter(client => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return new Date(client.createdAt) > threeDaysAgo;
      })
      .forEach(client => {
        notifications.push({
          id: `client-${client.id}`,
          type: "new_client",
          title: "New client added",
          description: client.businessName,
          timestamp: new Date(client.createdAt),
          link: `/clients/${client.id}`
        });
      });

    // Add new contact notifications (contacts created in the last 3 days)
    contacts
      .filter(contact => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return new Date(contact.createdAt) > threeDaysAgo;
      })
      .forEach(contact => {
        notifications.push({
          id: `contact-${contact.id}`,
          type: "new_contact",
          title: "New contact added",
          description: contact.name,
          timestamp: new Date(contact.createdAt),
          link: `/clients/${contact.clientId}`
        });
      });

    // Sort notifications by date (newest first)
    return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const notifications = generateNotifications();
  const unreadCount = notifications.length;

  // Handle click on notification
  const handleNotificationClick = (link?: string) => {
    if (link) {
      navigate(link);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="bg-primary p-3">
          <h4 className="font-medium text-sm text-primary-foreground">Notifications</h4>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border-b border-border p-3 cursor-pointer hover:bg-muted"
                  onClick={() => handleNotificationClick(notification.link)}
                >
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={cn(
                        notification.type === "task" && "bg-orange-500",
                        notification.type === "project" && "bg-blue-500",
                        notification.type === "new_client" && "bg-green-500",
                        notification.type === "new_contact" && "bg-purple-500"
                      )}
                    >
                      {notification.type === "task" ? "Task" :
                      notification.type === "project" ? "Project" :
                      notification.type === "new_client" ? "Client" : "Contact"}
                    </Badge>
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(notification.timestamp, "MMM dd, h:mm a")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No new notifications
            </div>
          )}
        </div>
        {notifications.length > 0 && (
          <div className="border-t border-border p-2 text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs" 
              onClick={() => setOpen(false)}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
