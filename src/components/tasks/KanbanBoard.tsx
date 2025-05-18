
import { Task } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { statusIcons } from "./taskUtils";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  icon: React.ReactNode;
  getProjectName: (projectId: string) => string;
  getClientName: (projectId: string) => string;
  columnId: string;
}

const KanbanColumn = ({ title, tasks, icon, getProjectName, getClientName, columnId }: KanbanColumnProps) => (
  <div className="flex flex-col min-w-[280px] max-w-[280px] bg-muted/40 rounded-lg p-3">
    <div className="flex items-center mb-3 gap-2">
      {icon}
      <h3 className="font-semibold">{title}</h3>
      <Badge variant="outline" className="ml-auto">{tasks.length}</Badge>
    </div>
    
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div 
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-270px)]"
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
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
          ))}
          {provided.placeholder}
          {tasks.length === 0 && (
            <div className="bg-background p-3 rounded-lg border border-dashed border-border text-center text-sm text-muted-foreground">
              No tasks
            </div>
          )}
        </div>
      )}
    </Droppable>
  </div>
);

interface KanbanBoardProps {
  tasks: Task[];
  getProjectName: (projectId: string) => string;
  getClientName: (projectId: string) => string;
  onTaskStatusChange?: (taskId: string, newStatus: string) => void;
}

const KanbanBoard = ({ tasks, getProjectName, getClientName, onTaskStatusChange }: KanbanBoardProps) => {
  const doingTasks = tasks.filter(task => task.status === "doing");
  const forReviewTasks = tasks.filter(task => task.status === "for_review");
  const doneTasks = tasks.filter(task => task.status === "done");
  const deferredTasks = tasks.filter(task => task.status === "deferred");
  
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If there's no destination or the item was dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Call the callback with the task id and new status
    if (onTaskStatusChange) {
      onTaskStatusChange(draggableId, destination.droppableId);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
        <KanbanColumn 
          title="In Progress"
          tasks={doingTasks} 
          icon={statusIcons.doing}
          getProjectName={getProjectName}
          getClientName={getClientName}
          columnId="doing"
        />
        <KanbanColumn 
          title="For Review" 
          tasks={forReviewTasks} 
          icon={statusIcons.for_review}
          getProjectName={getProjectName}
          getClientName={getClientName}
          columnId="for_review"
        />
        <KanbanColumn 
          title="Completed" 
          tasks={doneTasks} 
          icon={statusIcons.done}
          getProjectName={getProjectName}
          getClientName={getClientName}
          columnId="done"
        />
        <KanbanColumn 
          title="Deferred" 
          tasks={deferredTasks} 
          icon={statusIcons.deferred}
          getProjectName={getProjectName}
          getClientName={getClientName}
          columnId="deferred"
        />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
