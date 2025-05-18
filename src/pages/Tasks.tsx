
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, fetchClients, fetchProjects, updateTask } from "@/lib/api";
import TasksHeader from "@/components/tasks/TasksHeader";
import TaskStatusTabs from "@/components/tasks/TaskStatusTabs";
import TaskFilters from "@/components/tasks/TaskFilters";
import TasksContent from "@/components/tasks/TasksContent";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import { toast } from "sonner";

const Tasks = () => {
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
    mutationFn: (data: { taskId: string; status: string }) => 
      updateTask(data.taskId, { status: data.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update task status");
    }
  });

  const handleTaskStatusChange = (taskId: string, newStatus: string) => {
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

  const filterTasksByTab = (tasks = []) => {
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

  return (
    <div className="space-y-6">
      <TasksHeader onCreateTask={() => setIsCreateDialogOpen(true)} />
      
      <TaskStatusTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <TaskFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterProjectId={filterProjectId}
        onProjectFilterChange={setFilterProjectId}
        projects={projects}
        getProjectName={getProjectName}
        getClientName={getClientName}
        view={view}
        onViewChange={(newView) => {
          if (newView === "grid" || newView === "list" || newView === "kanban") {
            setView(newView as "grid" | "list" | "kanban");
          }
        }}
      />

      <TasksContent
        isLoading={isTasksLoading}
        tasks={filteredTasks}
        view={view}
        getProjectName={getProjectName}
        getClientName={getClientName}
        onCreateTask={() => setIsCreateDialogOpen(true)}
        onTaskStatusChange={handleTaskStatusChange}
      />

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
};

export default Tasks;
