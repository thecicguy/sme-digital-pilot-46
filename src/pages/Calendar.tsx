
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { addDays, format, startOfToday } from "date-fns";
import { fetchProjects, fetchTasks, fetchClients } from "@/lib/api";
import { Project, Task } from "@/types";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Building, BookmarkCheck, CalendarPlus } from "lucide-react";
import { CreateEventDialog } from "@/components/calendar/CreateEventDialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface EventType {
  id: string;
  title: string;
  date: Date;
  type: "project" | "task" | "meeting" | "other";
  color: string;
}

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(startOfToday());
  const [view, setView] = useState<"all" | "projects" | "tasks" | "meetings" | "other">("all");
  const [customEvents, setCustomEvents] = useState<EventType[]>(() => {
    const savedEvents = localStorage.getItem("calendar_events");
    return savedEvents ? JSON.parse(savedEvents, (key, value) => {
      if (key === "date") return new Date(value);
      return value;
    }) : [];
  });
  const isMobile = useIsMobile();
  
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  });

  // Save custom events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("calendar_events", JSON.stringify(customEvents));
  }, [customEvents]);

  // Create demo events for demonstration purposes
  const projectEvents: EventType[] = projects?.map((project: Project) => ({
    id: project.id,
    title: `${project.type} Project`,
    date: addDays(new Date(project.createdAt), project.daysAllocated),
    type: "project",
    color: "bg-blue-500"
  })) || [];

  const taskEvents: EventType[] = tasks?.map((task: Task) => ({
    id: task.id,
    title: task.description.substring(0, 20) + (task.description.length > 20 ? '...' : ''),
    date: task.dueDate || addDays(new Date(), 7),
    type: "task",
    color: "bg-amber-500"
  })) || [];

  // Example meeting events
  const meetingEvents: EventType[] = [
    {
      id: "meeting-1",
      title: "Client Onboarding",
      date: addDays(new Date(), 2),
      type: "meeting",
      color: "bg-green-500"
    },
    {
      id: "meeting-2",
      title: "Project Review",
      date: addDays(new Date(), 5),
      type: "meeting",
      color: "bg-green-500"
    },
    ...customEvents.filter(event => event.type === "meeting")
  ];

  const otherEvents: EventType[] = [
    {
      id: "other-1",
      title: "Team Building",
      date: addDays(new Date(), 14),
      type: "other",
      color: "bg-purple-500"
    },
    {
      id: "other-2",
      title: "Training Session",
      date: addDays(new Date(), 10),
      type: "other",
      color: "bg-pink-500"
    },
    ...customEvents.filter(event => event.type === "other")
  ];

  // Add custom events to the respective event types
  const customProjectEvents = customEvents.filter(event => event.type === "project");
  const customTaskEvents = customEvents.filter(event => event.type === "task");

  const allEvents = [
    ...projectEvents, 
    ...customProjectEvents,
    ...taskEvents, 
    ...customTaskEvents,
    ...meetingEvents.filter(e => e.id.startsWith("meeting-")), 
    ...otherEvents.filter(e => e.id.startsWith("other-")),
    ...customEvents
  ];
  
  const filteredEvents = allEvents.filter(event => 
    view === "all" || event.type === view
  );

  const selectedDateEvents = allEvents.filter(event => 
    date && format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  // Function to highlight days with events
  const isDayWithEvents = (day: Date) => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    return allEvents.some(event => format(event.date, 'yyyy-MM-dd') === formattedDay);
  };

  // Combine the events with the calendar
  const modifiers = {
    hasEvents: (date: Date) => isDayWithEvents(date),
  };

  const modifiersClassNames = {
    hasEvents: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary",
  };

  // Handle new event creation
  const handleEventCreated = (newEvent: EventType) => {
    setCustomEvents(prev => [...prev, newEvent]);
  };

  return (
    <div className="flex flex-col h-screen -mx-6 -my-6 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-background sticky top-0 z-10 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Track your project deadlines, task deadlines, client meetings, and other events
          </p>
        </div>
        <CreateEventDialog onEventCreated={handleEventCreated} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Calendar section on top - making it larger */}
        <div className="p-4 border-b flex-grow-0 flex-shrink-0" style={{ height: "60%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full">
            <div className="lg:col-span-5 h-full">
              <Card className="h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex items-center justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="mx-auto w-full h-full max-h-96"
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}
                    showOutsideDays={true}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Event Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={view} onValueChange={(value) => setView(value as any)}>
                    <TabsList className="grid w-full grid-cols-2 mb-2">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="tasks">Tasks</TabsTrigger>
                      <TabsTrigger value="meetings">Meetings</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-1 mt-2">
                      <TabsTrigger value="other">Other</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Events section below */}
        <div className="overflow-y-auto p-4" style={{ height: "40%" }}>
          <Card>
            <CardHeader>
              <CardTitle>
                {date ? (
                  <>Events for {format(date, 'PPP')}</>
                ) : (
                  <>All Upcoming Events</>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No events for this date</p>
              ) : (
                <div className="space-y-4">
                  {date && selectedDateEvents.map(event => (
                    <div key={event.id} className="flex items-center space-x-3">
                      <div className={`${event.color} rounded-full w-3 h-3 flex-shrink-0`}></div>
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">{event.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="font-medium mb-4">Legend</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-500 rounded-full w-3 h-3"></div>
                    <span className="text-sm">Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-500 rounded-full w-3 h-3"></div>
                    <span className="text-sm">Tasks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 rounded-full w-3 h-3"></div>
                    <span className="text-sm">Meetings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-500 rounded-full w-3 h-3"></div>
                    <span className="text-sm">Other</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
