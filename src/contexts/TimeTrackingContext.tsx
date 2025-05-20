
import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchTimeEntries, 
  fetchClients, 
  fetchProjects, 
  fetchTasks,
  startTimeEntry, 
  stopTimeEntry, 
  createTimeEntry,
  deleteTimeEntry
} from "@/lib/api";
import { TimeEntry, Client, Project, Task } from "@/types";
import { toast } from "sonner";

interface TimeTrackingContextType {
  timeEntries: TimeEntry[];
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  activeTimeEntry: TimeEntry | null;
  isLoading: boolean;
  startTimer: (data: {
    description: string;
    clientId?: string;
    projectId?: string;
    taskId?: string;
  }) => Promise<void>;
  stopTimer: () => Promise<void>;
  addTimeEntry: (data: {
    description: string;
    duration: number;
    startTime: Date;
    clientId?: string;
    projectId?: string;
    taskId?: string;
  }) => Promise<void>;
  deleteTimeEntryById: (id: string) => Promise<void>;
  elapsedTime: number;
}

const TimeTrackingContext = createContext<TimeTrackingContextType | undefined>(undefined);

export const TimeTrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTimeEntry, setActiveTimeEntry] = useState<TimeEntry | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const queryClient = useQueryClient();

  // Fetch all time entries
  const { data: timeEntries = [], isLoading: isTimeEntriesLoading } = useQuery({
    queryKey: ["timeEntries"],
    queryFn: () => fetchTimeEntries(),
  });

  // Fetch clients
  const { data: clients = [], isLoading: isClientsLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  });

  // Fetch projects
  const { data: projects = [], isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  // Fetch tasks
  const { data: tasks = [], isLoading: isTasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  const isLoading = isTimeEntriesLoading || isClientsLoading || isProjectsLoading || isTasksLoading;

  // Check for active time entries on load
  useEffect(() => {
    const active = timeEntries.find(entry => entry.isRunning);
    if (active) {
      setActiveTimeEntry(active);
    }
  }, [timeEntries]);

  // Timer effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (activeTimeEntry) {
      interval = window.setInterval(() => {
        const startTime = new Date(activeTimeEntry.startTime).getTime();
        const now = new Date().getTime();
        const diff = now - startTime;
        setElapsedTime(Math.floor(diff / 1000));
      }, 1000);
    } else {
      setElapsedTime(0);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeTimeEntry]);

  // Mutations
  const startTimerMutation = useMutation({
    mutationFn: startTimeEntry,
    onSuccess: (newTimeEntry) => {
      queryClient.invalidateQueries({ queryKey: ["timeEntries"] });
      setActiveTimeEntry(newTimeEntry);
      toast.success("Timer started");
    },
    onError: (error) => {
      toast.error(`Failed to start timer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const stopTimerMutation = useMutation({
    mutationFn: stopTimeEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeEntries"] });
      setActiveTimeEntry(null);
      toast.success("Timer stopped");
    },
    onError: (error) => {
      toast.error(`Failed to stop timer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const addTimeEntryMutation = useMutation({
    mutationFn: createTimeEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeEntries"] });
      toast.success("Time entry added");
    },
    onError: (error) => {
      toast.error(`Failed to add time entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const deleteTimeEntryMutation = useMutation({
    mutationFn: deleteTimeEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeEntries"] });
      toast.success("Time entry deleted");
    },
    onError: (error) => {
      toast.error(`Failed to delete time entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Helper functions
  const startTimer = async (data: {
    description: string;
    clientId?: string;
    projectId?: string;
    taskId?: string;
  }) => {
    if (activeTimeEntry) {
      toast.error("A timer is already running");
      return;
    }
    
    await startTimerMutation.mutateAsync({
      description: data.description,
      startTime: new Date(),
      isRunning: true,
      userId: "user-1", // Hardcoded for now
      clientId: data.clientId,
      projectId: data.projectId,
      taskId: data.taskId,
    });
  };

  const stopTimer = async () => {
    if (!activeTimeEntry) {
      toast.error("No active timer");
      return;
    }
    
    await stopTimerMutation.mutateAsync(activeTimeEntry.id);
  };

  const addTimeEntry = async (data: {
    description: string;
    duration: number;
    startTime: Date;
    clientId?: string;
    projectId?: string;
    taskId?: string;
  }) => {
    const endTime = new Date(data.startTime.getTime() + data.duration * 60 * 1000);
    
    await addTimeEntryMutation.mutateAsync({
      description: data.description,
      duration: data.duration,
      startTime: data.startTime,
      endTime: endTime,
      isRunning: false,
      userId: "user-1", // Hardcoded for now
      clientId: data.clientId,
      projectId: data.projectId,
      taskId: data.taskId,
    });
  };

  const deleteTimeEntryById = async (id: string) => {
    await deleteTimeEntryMutation.mutateAsync(id);
  };

  return (
    <TimeTrackingContext.Provider
      value={{
        timeEntries,
        clients,
        projects,
        tasks,
        activeTimeEntry,
        isLoading,
        startTimer,
        stopTimer,
        addTimeEntry,
        deleteTimeEntryById,
        elapsedTime,
      }}
    >
      {children}
    </TimeTrackingContext.Provider>
  );
};

export const useTimeTracking = () => {
  const context = useContext(TimeTrackingContext);
  if (context === undefined) {
    throw new Error("useTimeTracking must be used within a TimeTrackingProvider");
  }
  return context;
};
