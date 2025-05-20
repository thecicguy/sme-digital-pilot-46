
import { useState } from "react";
import { useTimeTracking } from "@/contexts/TimeTrackingContext";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Timer, MoreVertical, Play, Briefcase, Users, List } from "lucide-react";

const TimeTrackingContent: React.FC = () => {
  const { timeEntries, isLoading, clients, projects, tasks, deleteTimeEntryById, startTimer } = useTimeTracking();
  
  // Get entity names by ID
  const getClientName = (clientId?: string) => {
    if (!clientId) return "—";
    const client = clients.find(c => c.id === clientId);
    return client ? client.businessName : "Unknown Client";
  };
  
  const getProjectName = (projectId?: string) => {
    if (!projectId) return "—";
    const project = projects.find(p => p.id === projectId);
    return project ? project.type : "Unknown Project";
  };
  
  const getTaskDescription = (taskId?: string) => {
    if (!taskId) return "—";
    const task = tasks.find(t => t.id === taskId);
    return task ? task.description : "Unknown Task";
  };
  
  // Format duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Restart a time entry
  const handleRestart = (entry: typeof timeEntries[0]) => {
    startTimer({
      description: entry.description,
      clientId: entry.clientId,
      projectId: entry.projectId,
      taskId: entry.taskId
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (timeEntries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <Timer className="mx-auto h-8 w-8 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium">No time entries</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Start tracking time for your work
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeEntries
            .filter(entry => !entry.isRunning)
            .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
            .map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.description}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  {getClientName(entry.clientId)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                  {getProjectName(entry.projectId)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <List className="mr-2 h-4 w-4 text-muted-foreground" />
                  {getTaskDescription(entry.taskId)}
                </div>
              </TableCell>
              <TableCell>
                {format(new Date(entry.startTime), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="font-mono">
                {formatDuration(entry.duration)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleRestart(entry)}>
                      <Play className="mr-2 h-4 w-4" />
                      Restart
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => deleteTimeEntryById(entry.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TimeTrackingContent;
