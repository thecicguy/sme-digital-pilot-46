
import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, fetchClients, fetchProjects, updateTask } from "@/lib/api";
import { Task, TaskStatus } from "@/types";
import { toast } from "sonner";

interface TasksContextType {
  tasks: Task[] | undefined;
  isTasksLoading: boolean;
  clients: any[] | undefined;
  projects: any[] | undefined;
  filteredTasks: Task[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterProjectId: string;
  setFilterProjectId: (id: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  view: "grid" | "list" | "kanban";
  setView: (view: "grid" | "list" | "kanban") => void;
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (isOpen: boolean) => void;
  handleTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  getClientName: (projectId: string) => string;
  getProjectName: (projectId: string) => string;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProjectId, setFilterProjectId] = useState("all");
  const [filterStatus, setFilterStatus] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list" | "kanban">("kanban");

  const queryClient = useQueryClient();

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: { taskId: string; status: TaskStatus }) => 
      updateTask(data.taskId, { status: data.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update task status");
    }
  });

  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    updateTaskMutation.mutate({ taskId, status: newStatus });
  };

  const getClientName = (projectId: string) => {
    const project = projects?.find(p => p.id === projectId);
    if (!project) return "Unknown Client";
    
    const client = clients?.find(c => c.id === project.clientId);
    return client?.businessName || "Unknown Client";
  };

  const getProjectName = (projectId: string) => {
    const project = projects?.find(p => p.id === projectId);
    return project?.type || "Unknown Project";
  };

  const filterTasksByTab = (tasks: Task[] = []) => {
    if (activeTab === "all") return tasks;
    return tasks.filter(task => task.status === activeTab);
  };

  const filteredTasks = tasks
    ? filterTasksByTab(tasks).filter(task => {
        const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProject = filterProjectId === "all" ? true : task.projectId === filterProjectId;
        const matchesStatus = filterStatus ? task.status === filterStatus : true;
        return matchesSearch && matchesProject && matchesStatus;
      })
    : [];

  const value = {
    tasks,
    isTasksLoading,
    clients,
    projects,
    filteredTasks,
    searchTerm,
    setSearchTerm,
    filterProjectId,
    setFilterProjectId,
    filterStatus,
    setFilterStatus,
    activeTab,
    setActiveTab,
    view,
    setView,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleTaskStatusChange,
    getClientName,
    getProjectName
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
