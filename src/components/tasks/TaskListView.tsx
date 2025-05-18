
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { statusIcons, statusLabels } from "./taskUtils";
import { Task } from "@/types";

interface TaskListViewProps {
  tasks: Task[];
  getProjectName: (projectId: string) => string;
  getClientName: (projectId: string) => string;
}

const TaskListView = ({ tasks, getProjectName, getClientName }: TaskListViewProps) => {
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

export default TaskListView;
