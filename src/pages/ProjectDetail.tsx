import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProject, fetchTasks, fetchClient, fetchContacts, fetchNotes } from "@/lib/api";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Plus,
  User,
  FileText,
  Mail,
  Book,
  Upload
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Contact } from "@/types";
import CreateNoteDialog from "@/components/notes/CreateNoteDialog";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreateNoteDialogOpen, setIsCreateNoteDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: project, isLoading: isProjectLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectId ? fetchProject(projectId) : undefined,
    enabled: !!projectId
  });

  const { data: client } = useQuery({
    queryKey: ["client", project?.clientId],
    queryFn: () => project?.clientId ? fetchClient(project.clientId) : undefined,
    enabled: !!project?.clientId
  });

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ["projectTasks", projectId],
    queryFn: () => projectId ? fetchTasks(projectId) : [],
    enabled: !!projectId
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ["clientContacts", project?.clientId],
    queryFn: () => project?.clientId ? fetchContacts(project.clientId) : [],
    enabled: !!project?.clientId
  });

  const { data: notes = [], isLoading: isNotesLoading } = useQuery({
    queryKey: ["projectNotes", projectId],
    queryFn: () => projectId ? fetchNotes(undefined, projectId) : [],
    enabled: !!projectId
  });

  const handleUploadDocument = () => {
    toast({
      title: "Upload initiated",
      description: "Document upload feature will be implemented soon."
    });
  };

  if (isProjectLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

  const completedTasks = tasks?.filter(task => task.status === "done").length || 0;
  const totalTasks = tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const linkedContacts: Contact[] = contacts.filter(contact => 
    tasks?.some(task => task.assigneeId === contact.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <span className="text-sm font-medium text-muted-foreground capitalize">{project.type} Project</span>
            <h1 className="text-2xl font-bold tracking-tight">Project for {client?.businessName || "Loading client..."}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(`/tasks?projectId=${project.id}`)}>
            View Tasks
          </Button>
        </div>
      </div>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Type</dt>
              <dd className="text-lg capitalize">{project.type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Status</dt>
              <dd className="text-lg">
                {totalTasks === 0 ? (
                  <Badge variant="outline">Not Started</Badge>
                ) : completedTasks === totalTasks ? (
                  <Badge variant="secondary">Completed</Badge>
                ) : (
                  <Badge variant="secondary">In Progress</Badge>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Client</dt>
              <dd className="text-lg">{client?.businessName || "Loading client..."}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Days Allocated</dt>
              <dd className="text-lg">{project.daysAllocated} days</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Linked Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Linked Contacts</CardTitle>
          <CardDescription>Contacts with tasks assigned in this project</CardDescription>
        </CardHeader>
        <CardContent>
          {linkedContacts.length > 0 ? (
            <div className="space-y-4">
              {linkedContacts.map(contact => (
                <div key={contact.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.role}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{tasks?.filter(task => task.assigneeId === contact.id).length} Tasks</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No contacts are currently assigned to tasks in this project.</p>
          )}
        </CardContent>
      </Card>

      {/* Timeline & Progress Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Days Allocated</span>
              <span className="text-sm">{project.daysAllocated} days</span>
            </div>
            {tasks?.length > 0 && tasks.some(task => task.dueDate) && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next Due Task</span>
                <span className="text-sm">
                  {formatDistanceToNow(
                    new Date(
                      tasks
                        .filter(task => task.dueDate && task.status !== "done")
                        .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())[0]?.dueDate || new Date()
                    ),
                    { addSuffix: true }
                  )}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between text-sm">
                <span>{completedTasks} of {totalTasks} tasks completed</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-md bg-muted p-2 text-center">
                <p className="text-xs text-muted-foreground">In Progress</p>
                <p className="text-lg font-medium">{tasks?.filter(task => task.status === "doing").length || 0}</p>
              </div>
              <div className="rounded-md bg-muted p-2 text-center">
                <p className="text-xs text-muted-foreground">For Review</p>
                <p className="text-lg font-medium">{tasks?.filter(task => task.status === "for_review").length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Description */}
      <Card>
        <CardHeader>
          <CardTitle>Project Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {project.type.charAt(0).toUpperCase() + project.type.slice(1)} project for {client?.businessName}.
            {client?.description && <span> {client.description}</span>}
          </p>
        </CardContent>
      </Card>

      {/* Contacts Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Client Contacts</CardTitle>
          <Button size="sm" asChild variant="outline">
            <Link to={`/clients/${project.clientId}`}>
              <User className="mr-1 h-4 w-4" /> View Client Details
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.map(contact => (
                <div key={contact.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{contact.email}</span>
                        {contact.mobileNumber && (
                          <>
                            <span>•</span>
                            <span>{contact.mobileNumber}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge>{contact.role}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No contacts found for this client.</p>
          )}
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Notes</CardTitle>
          <Button size="sm" onClick={() => setIsCreateNoteDialogOpen(true)}>
            <Plus className="mr-1 h-4 w-4" /> Add Note
          </Button>
        </CardHeader>
        <CardContent>
          {isNotesLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map(note => (
                <div key={note.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">{note.category.replace('_', ' ')}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Book className="mb-2 h-8 w-8 text-muted-foreground" />
              <h3 className="text-lg font-medium">No notes yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add notes to keep track of important information.</p>
              <Button className="mt-4" onClick={() => setIsCreateNoteDialogOpen(true)}>
                <Plus className="mr-1 h-4 w-4" /> Add First Note
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emails Section */}
      <Card>
        <CardHeader>
          <CardTitle>Emails</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Mail className="mb-2 h-8 w-8 text-muted-foreground" />
            <h3 className="text-lg font-medium">No email history</h3>
            <p className="mt-1 text-sm text-muted-foreground">Email communication with the client will appear here.</p>
            <Button className="mt-4" variant="outline" asChild>
              <Link to={`/settings/email-templates`}>
                Setup Email Templates
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tasks</CardTitle>
          <Button size="sm" asChild>
            <Link to={`/tasks?projectId=${projectId}`}>
              <Plus className="mr-1 h-4 w-4" /> Add Task
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {isTasksLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : tasks && tasks.length > 0 ? (
            <div className="divide-y rounded-md border">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4">
                  <div className="flex items-start gap-3">
                    {task.status === "done" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : task.status === "for_review" ? (
                      <Clock className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium">{task.description}</p>
                      {task.dueDate && (
                        <p className="text-xs text-muted-foreground">
                          Due {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge variant={task.status === "done" ? "outline" : "secondary"} className="capitalize">
                    {task.status === "doing" ? "In Progress" : 
                     task.status === "done" ? "Completed" : 
                     task.status === "for_review" ? "For Review" : "Deferred"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="mb-2 h-8 w-8 text-muted-foreground" />
              <h3 className="text-lg font-medium">No tasks yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">Create tasks to track project progress.</p>
              <Button className="mt-4" asChild>
                <Link to={`/tasks?projectId=${projectId}`}>
                  <Plus className="mr-1 h-4 w-4" /> Add First Task
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Store Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Document Store</CardTitle>
          <Button size="sm" onClick={handleUploadDocument}>
            <Upload className="mr-1 h-4 w-4" />
            Add Document
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No documents yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Upload project documents to keep them organized.</p>
            <Button className="mt-4" onClick={handleUploadDocument}>
              <Upload className="mr-1 h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreateNoteDialog
        open={isCreateNoteDialogOpen}
        onClose={() => setIsCreateNoteDialogOpen(false)}
        projectId={projectId}
        clientId={project.clientId}
      />
    </div>
  );
};

export default ProjectDetail;
