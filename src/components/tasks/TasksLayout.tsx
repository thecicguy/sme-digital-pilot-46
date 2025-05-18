
import React from "react";
import TasksHeader from "@/components/tasks/TasksHeader";
import TaskStatusTabs from "@/components/tasks/TaskStatusTabs";
import TasksContent from "@/components/tasks/TasksContent";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import { useTasks } from "@/contexts/TasksContext";

const TasksLayout: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    view,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isTasksLoading,
    filteredTasks,
    getProjectName,
    getClientName,
    handleTaskStatusChange
  } = useTasks();

  return (
    <div className="space-y-6">
      <TasksHeader onCreateTask={() => setIsCreateDialogOpen(true)} />
      
      <TaskStatusTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
