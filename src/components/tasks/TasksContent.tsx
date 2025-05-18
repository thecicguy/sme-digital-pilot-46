import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import KanbanBoard from "@/components/tasks/KanbanBoard";
import { statusIcons, statusLabels } from "./taskUtils";
import { Task } from "@/types";

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
    return <EmptyTasksState onCreateTask={onCreateTask} />;
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Badge variant="outline" className="flex items-center gap-1 capitalize">
                  {statusIcons[task.status]}
                  {statusLabels[task.status]}
                </Badge>
                {task.dueDate && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {format(new Date(task.dueDate), "MMM d, yyyy")}
                  </div>
                )}
              </div>
              <CardTitle className="mt-2 text-base">{task.description}</CardTitle>
              <CardDescription className="mt-1">
                {getProjectName(task.projectId)} - {getClientName(task.projectId)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 text-sm">
              {task.references && (
                <div className="mt-2 rounded-md bg-muted p-2 text-xs">
                  <span className="font-semibold">References: </span>
                  {task.references}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to={`/tasks/${task.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  // List view (default)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">{task.description}</TableCell>
            <TableCell>
              {getProjectName(task.projectId)} - {getClientName(task.projectId)}
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="flex items-center w-fit gap-1 capitalize">
                {statusIcons[task.status]}
                {statusLabels[task.status]}
              </Badge>
            </TableCell>
            <TableCell>
              {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "-"}
            </TableCell>
            <TableCell className="text-right">
              <Button asChild size="sm" variant="outline">
                <Link to={`/tasks/${task.id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const TasksLoadingSkeleton = ({ view }: { view: string }) => {
  if (view === "kanban") {
    return (
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-muted/40 rounded-lg p-3 min-w-[280px]">
            <Skeleton className="h-6 w-24 mb-3" />
            {[1, 2].map((j) => (
              <Card key={j} className="mb-2">
                <CardHeader className="p-3 pb-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3 mt-2" />
                </CardHeader>
                <CardFooter className="p-3 pt-1">
                  <Skeleton className="h-7 w-16 ml-auto" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ))}
      </div>
    );
  }
  
  if (view === "grid") {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
            <TableCell className="text-right"><Skeleton className="h-9 w-20 ml-auto" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const EmptyTasksState = ({ onCreateTask }: { onCreateTask: () => void }) => (
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

export default TasksContent;
