
import React, { useState } from "react";
import TasksHeader from "@/components/tasks/TasksHeader";
import TasksContent from "@/components/tasks/TasksContent";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import { useTasks } from "@/contexts/TasksContext";

const TasksLayout: React.FC = () => {
  const {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isTasksLoading,
    filteredTasks,
    getProjectName,
    getClientName,
    handleTaskStatusChange,
    view,
    setView
  } = useTasks();

  return (
    <div className="space-y-6">
      <TasksHeader onCreateTask={() => setIsCreateDialogOpen(true)} />
      
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
