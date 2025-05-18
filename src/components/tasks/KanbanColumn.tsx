
import React from "react";
import { Task, TaskStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Droppable } from "react-beautiful-dnd";
import KanbanTask from "./KanbanTask";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  icon: React.ReactNode;
  getProjectName: (projectId: string) => string;
  getClientName: (projectId: string) => string;
  columnId: TaskStatus | "all";
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, 
  tasks, 
  icon, 
  getProjectName, 
  getClientName, 
  columnId 
}) => (
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
            <KanbanTask
              key={task.id}
              task={task}
              index={index}
              getProjectName={getProjectName}
              getClientName={getClientName}
            />
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

export default KanbanColumn;
