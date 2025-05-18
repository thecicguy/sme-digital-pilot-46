
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskEmptyStateProps {
  onCreateTask: () => void;
}

const TaskEmptyState = ({ onCreateTask }: TaskEmptyStateProps) => (
  <div className="rounded-lg border border-border bg-background p-8 text-center">
    <h3 className="mb-2 text-lg font-medium">No tasks found</h3>
    <p className="text-muted-foreground">
      Try adjusting your filters or create a new task to get started.
    </p>
    <Button className="mt-4" onClick={onCreateTask}>
      <Plus className="mr-2 h-4 w-4" />
      New Task
    </Button>
  </div>
);

export default TaskEmptyState;
