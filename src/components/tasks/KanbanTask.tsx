
import React from "react";
import { Task } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

interface KanbanTaskProps {
  task: Task;
  index: number;
  getProjectName: (projectId: string) => string;
  getClientName: (projectId: string) => string;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({ 
  task, 
  index, 
  getProjectName, 
  getClientName 
}) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-sm font-medium">{task.description}</CardTitle>
            <CardDescription className="text-xs">
              {getProjectName(task.projectId)} - {getClientName(task.projectId)}
            </CardDescription>
          </CardHeader>
          {task.references && (
            <CardContent className="p-3 pt-1 pb-1 text-xs">
              <div className="rounded-md bg-background p-1">
                <span className="font-semibold">Refs: </span>
                {task.references.length > 30 ? `${task.references.substring(0, 30)}...` : task.references}
              </div>
            </CardContent>
          )}
          <CardFooter className="p-3 pt-1 flex justify-between items-center">
            {task.dueDate ? (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {format(new Date(task.dueDate), "MMM d")}
              </div>
            ) : (
              <span></span>
            )}
            <Button asChild size="sm" variant="outline" className="h-7 text-xs">
              <Link to={`/tasks/${task.id}`}>View</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )}
  </Draggable>
);

export default KanbanTask;
