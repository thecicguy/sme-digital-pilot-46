
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { statusIcons, statusLabels } from "./taskUtils";
import { Task } from "@/types";

interface TaskGridViewProps {
  tasks: Task[];
  getProjectName: (projectId: string) => string;
  getClientName: (projectId: string) => string;
}

const TaskGridView = ({ tasks, getProjectName, getClientName }: TaskGridViewProps) => {
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
};

export default TaskGridView;
