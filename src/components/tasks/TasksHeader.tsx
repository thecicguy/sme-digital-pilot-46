
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TasksHeaderProps {
  onCreateTask: () => void;
}

const TasksHeader = ({ onCreateTask }: TasksHeaderProps) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">Manage and track all project tasks</p>
      </div>
      <Button onClick={onCreateTask}>
        <Plus className="mr-2 h-4 w-4" />
        New Task
      </Button>
    </div>
  );
};

export default TasksHeader;
