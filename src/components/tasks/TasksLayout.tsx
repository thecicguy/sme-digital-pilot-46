
import React from "react";
import TasksHeader from "@/components/tasks/TasksHeader";
import TaskStatusTabs from "@/components/tasks/TaskStatusTabs";
import TaskFilters from "@/components/tasks/TaskFilters";
import TasksContent from "@/components/tasks/TasksContent";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import { useTasks } from "@/contexts/TasksContext";

const TasksLayout: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    filterProjectId,
    setFilterProjectId,
    activeTab,
    setActiveTab,
    view,
    setView,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isTasksLoading,
    filteredTasks,
    projects,
    getProjectName,
    getClientName,
    handleTaskStatusChange
  } = useTasks();

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

export default TasksLayout;
