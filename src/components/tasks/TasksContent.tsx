
import { Task } from "@/types";
import KanbanBoard from "@/components/tasks/KanbanBoard";
import TaskGridView from "@/components/tasks/TaskGridView";
import TaskListView from "@/components/tasks/TaskListView";
import TaskEmptyState from "@/components/tasks/TaskEmptyState";
import TasksLoadingSkeleton from "@/components/tasks/TaskLoadingSkeleton";

interface TasksContentProps {
  isLoading: boolean;
  tasks: Task[];
  view: "grid" | "list" | "kanban";
  getProjectName: (projectId: string) => string;
  getClientName: (projectId: string) => string;
  onCreateTask: () => void;
  onTaskStatusChange?: (taskId: string, newStatus: string) => void;
}

const TasksContent = ({
  isLoading,
  tasks,
  view,
  getProjectName,
  getClientName,
  onCreateTask,
  onTaskStatusChange
}: TasksContentProps) => {
  if (isLoading) {
    return <TasksLoadingSkeleton view={view} />;
  }

  if (tasks.length === 0) {
    return <TaskEmptyState onCreateTask={onCreateTask} />;
  }

  if (view === "kanban") {
    return (
      <KanbanBoard
        tasks={tasks}
        getProjectName={getProjectName}
        getClientName={getClientName}
        onTaskStatusChange={onTaskStatusChange}
      />
    );
  }

  if (view === "grid") {
    return (
      <TaskGridView
        tasks={tasks}
        getProjectName={getProjectName}
        getClientName={getClientName}
      />
    );
  }

  // List view (default)
  return (
    <TaskListView
      tasks={tasks}
      getProjectName={getProjectName}
      getClientName={getClientName}
    />
  );
};

export default TasksContent;
