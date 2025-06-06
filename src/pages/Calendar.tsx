
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { addDays, format, startOfToday } from "date-fns";
import { fetchProjects, fetchTasks, fetchClients } from "@/lib/api";
import { Project, Task } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarPlus } from "lucide-react";
import { CreateEventDialog } from "@/components/calendar/CreateEventDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import CalendarFilterBar from "@/components/calendar/CalendarFilterBar";

interface EventType {
  id: string;
  title: string;
  date: Date;
  type: "project" | "task" | "meeting" | "other";
  color: string;
}

const Calendar = () => {
  const [date, setDate] = useState<Date>(startOfToday());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday());
  const [view, setView] = useState<"all" | "projects" | "tasks" | "meetings" | "other">("all");
  const [customEvents, setCustomEvents] = useState<EventType[]>(() => {
    const savedEvents = localStorage.getItem("calendar_events");
    return savedEvents ? JSON.parse(savedEvents, (key, value) => {
      if (key === "date") return new Date(value);
      return value;
    }) : [];
  });
  const [eventTypes, setEventTypes] = useState<{id: string, name: string, color: string}[]>([
    { id: "projects", name: "Projects", color: "bg-blue-500" },
    { id: "tasks", name: "Tasks", color: "bg-amber-500" },
    { id: "meetings", name: "Meetings", color: "bg-green-500" },
    { id: "other", name: "Other", color: "bg-purple-500" }
  ]);
  
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
  
  // Check for saved event types
  useEffect(() => {
    const savedEventTypes = localStorage.getItem("calendar_event_types");
    if (savedEventTypes) {
      try {
        const parsedTypes = JSON.parse(savedEventTypes);
        // Convert hex colors to bg-color classes
        const formattedTypes = parsedTypes.map((type: any) => ({
          ...type,
          color: type.id === "projects" ? "bg-blue-500" : 
                 type.id === "tasks" ? "bg-amber-500" : 
                 type.id === "meetings" ? "bg-green-500" :
                 type.id === "other" ? "bg-purple-500" : 
                 `bg-[${type.color}]`
        }));
        setEventTypes(formattedTypes);
      } catch (e) {
        console.error("Error loading saved event types", e);
      }
    }
  }, []);

  // Create demo events for demonstration purposes
  const projectEvents: EventType[] = projects?.map((project: Project) => ({
    id: project.id,
    title: `${project.type} Project`,
    date: addDays(new Date(project.createdAt), project.daysAllocated),
    type: "project",
    color: "bg-blue-500 text-white"
  })) || [];

  const taskEvents: EventType[] = tasks?.map((task: Task) => ({
    id: task.id,
    title: task.description.substring(0, 20) + (task.description.length > 20 ? '...' : ''),
    date: task.dueDate || addDays(new Date(), 7),
    type: "task",
    color: "bg-amber-500 text-white"
  })) || [];

  // Example meeting events
  const meetingEvents: EventType[] = [
    {
      id: "meeting-1",
      title: "Client Onboarding",
      date: addDays(new Date(), 2),
      type: "meeting",
      color: "bg-green-500 text-white"
    },
    {
      id: "meeting-2",
      title: "Project Review",
      date: addDays(new Date(), 5),
      type: "meeting",
      color: "bg-green-500 text-white"
    },
    ...customEvents.filter(event => event.type === "meeting")
  ];

  const otherEvents: EventType[] = [
    {
      id: "other-1",
      title: "Team Building",
      date: addDays(new Date(), 14),
      type: "other",
      color: "bg-purple-500 text-white"
    },
    {
      id: "other-2",
      title: "Training Session",
      date: addDays(new Date(), 10),
      type: "other",
      color: "bg-pink-500 text-white"
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
    selectedDate && format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  // Handle new event creation
  const handleEventCreated = (newEvent: EventType) => {
    setCustomEvents(prev => [...prev, newEvent]);
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Handle filter change from the filter bar
  const handleFilterChange = (newFilter: "all" | "projects" | "tasks" | "meetings" | "other") => {
    setView(newFilter);
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

      <CalendarFilterBar activeFilter={view} onFilterChange={handleFilterChange} />

      <div className="flex flex-col md:flex-row h-full overflow-hidden">
        {/* Main Calendar Section */}
        <div className="flex-grow p-4 overflow-auto">
          <MonthlyCalendar 
            currentDate={date}
            events={filteredEvents}
            onDateChange={setDate}
            onDateSelect={handleDateSelect}
          />
          
          {/* Legend Section Below Calendar */}
          <div className="mt-4 bg-white rounded-lg border p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventTypes.map(type => (
                <div key={type.id} className="flex items-center gap-2">
                  <div className={`${type.color.startsWith('bg-[') ? type.color : type.color} rounded-full w-4 h-4`}></div>
                  <span className="text-sm">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Details Sidebar */}
        <div className="md:w-80 border-l p-4 overflow-y-auto bg-muted/10">
          <h3 className="font-semibold mb-4">
            {selectedDate ? (
              <>Events for {format(selectedDate, 'PPP')}</>
            ) : (
              <>Select a date</>
            )}
          </h3>
          
          {selectedDateEvents.length === 0 ? (
            <p className="text-muted-foreground">No events for this date</p>
          ) : (
            <div className="space-y-3">
              {selectedDateEvents.map(event => (
                <Card key={event.id} className="overflow-hidden">
                  <div className={`h-1.5 ${event.color.split(' ')[0]}`}></div>
                  <CardContent className="p-3 pt-3">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
