import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProject,
  fetchTasks,
  fetchNotes
} from "@/lib/api";
import { 
  ArrowLeft, 
  Briefcase, 
  FileText, 
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  File,
  Upload
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import CreateNoteDialog from "@/components/notes/CreateNoteDialog";
import { statusIcons, statusLabels } from "@/components/tasks/taskUtils";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: project, isLoading: isProjectLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectId ? fetchProject(projectId) : undefined,
    enabled: !!projectId
  });

  const { data: tasks = [], isLoading: isTasksLoading } = useQuery({
    queryKey: ["projectTasks", projectId],
    queryFn: () => fetchTasks(),
    enabled: !!projectId
  });

  const { data: notes = [], isLoading: isNotesLoading } = useQuery({
    queryKey: ["projectNotes", projectId],
    queryFn: () => fetchNotes(),
    enabled: !!projectId
  });

  const handleUploadDocument = () => {
    toast({
      title: "Upload initiated",
      description: "Document upload feature will be implemented soon."
    });
  };

  // Filter tasks for this project
  const projectTasks = tasks.filter(task => task.projectId === projectId) || [];
  
  // Filter notes for this project
  // Ensure notes is an array before filtering
  const projectNotes = Array.isArray(notes) 
    ? notes.filter(note => note.projectId === projectId) 
    : [];

  if (isProjectLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <h2 className="text-2xl font-semibold">Project not found</h2>
        <p className="text-muted-foreground">The project you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link to="/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  // Calculate project timeline
  const startDate = new Date(project.createdAt);
  const endDate = new Date(project.createdAt);
  endDate.setDate(endDate.getDate() + project.daysAllocated);
  
  const today = new Date();
  const totalDays = project.daysAllocated;
  const daysElapsed = Math.min(
    Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
    totalDays
  );
  const progressPercentage = Math.round((daysElapsed / totalDays) * 100);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight capitalize">{project.type} Project</h1>
          <Badge variant="outline" className="ml-2">
            {project.daysAllocated} days
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to={`/clients/${project.clientId}`}>View Client</Link>
          </Button>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Project Overview
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project Type</p>
                  <p className="text-base capitalize">{project.type}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-base flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Day {daysElapsed} of {totalDays}</span>
                        <span>{progressPercentage}% Complete</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className="mt-1">
                    {today > endDate ? "Completed" : "In Progress"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Tasks
          </h2>
          <Button size="sm" onClick={() => setIsTaskDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
        
        {isTasksLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : projectTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTasks.map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{task.description}</CardTitle>
                    <Badge variant="outline" className="flex items-center gap-1 capitalize">
                      {statusIcons[task.status]}
                      {statusLabels[task.status]}
                    </Badge>
                  </div>
                  {task.dueDate && (
                    <CardDescription>
                      Due {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {task.references && (
                    <div className="mb-4 text-sm">
                      <span className="font-medium">References:</span> {task.references}
                    </div>
                  )}
                  <Button size="sm" asChild>
                    <Link to={`/tasks/${task.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No tasks yet</h3>
              <p className="text-sm text-muted-foreground">
                Add tasks to track work for this project
              </p>
              <Button className="mt-4" onClick={() => setIsTaskDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Notes
          </h2>
          <Button size="sm" onClick={() => setIsNoteDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </div>
        
        {isNotesLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : projectNotes.length > 0 ? (
          projectNotes.map((note) => (
            <Card key={note.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge>{note.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p>{note.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No notes yet</h3>
              <p className="text-sm text-muted-foreground">
                Notes help you keep track of important information about this project
              </p>
              <Button className="mt-4" onClick={() => setIsNoteDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Team Members Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Members
        </h2>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No team members assigned</h3>
            <p className="text-sm text-muted-foreground">
              Team member management will be implemented in a future update
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Document Store Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <File className="h-5 w-5" />
            Document Store
          </h2>
          <Button size="sm" onClick={handleUploadDocument}>
            <Upload className="mr-2 h-4 w-4" />
            Add Document
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-6 text-center">
            <File className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No documents yet</h3>
            <p className="text-sm text-muted-foreground">
              Documents related to this project will appear here
            </p>
            <Button className="mt-4" onClick={handleUploadDocument}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      </div>

      {projectId && (
        <>
          <CreateTaskDialog
            open={isTaskDialogOpen}
            onClose={() => setIsTaskDialogOpen(false)}
            projectId={projectId}
          />

          <CreateNoteDialog
            open={isNoteDialogOpen}
            onClose={() => setIsNoteDialogOpen(false)}
            projectId={projectId}
          />
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
