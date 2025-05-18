
import React from "react";
import { Task, TaskStatus } from "@/types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";
import { statusIcons } from "./taskUtils";

interface KanbanBoardProps {
  tasks: Task[];
  getProjectName: (projectId: string) => string;
  getClientName: (projectId: string) => string;
  onTaskStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  tasks, 
  getProjectName, 
  getClientName, 
  onTaskStatusChange 
}) => {
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

    // Validate that destination.droppableId is a valid TaskStatus before proceeding
    if (destination.droppableId === "doing" || 
        destination.droppableId === "for_review" || 
        destination.droppableId === "done" || 
        destination.droppableId === "deferred") {

      // Call the callback with the task id and new status
      if (onTaskStatusChange) {
        onTaskStatusChange(draggableId, destination.droppableId as TaskStatus);
      }
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
