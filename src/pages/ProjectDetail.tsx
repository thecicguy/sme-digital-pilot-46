
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProject, fetchTasks } from "@/lib/api";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Plus,
  User
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: project, isLoading: isProjectLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectId ? fetchProject(projectId) : undefined,
    enabled: !!projectId
  });

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ["projectTasks", projectId],
    queryFn: () => projectId ? fetchTasks(projectId) : [],
    enabled: !!projectId
  });

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

  const completedTasks = tasks?.filter(task => task.status === "completed").length || 0;
  const totalTasks = tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <span className="text-sm font-medium text-muted-foreground capitalize">{project.type} Project</span>
            <h1 className="text-2xl font-bold tracking-tight">Project for {project.clientName}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(`/tasks?projectId=${project.id}`)}>
            View Tasks
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{completedTasks} of {totalTasks} tasks completed</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Created</span>
              <span className="text-xs">{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Days Allocated</span>
              <span className="text-xs">{project.daysAllocated} days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <Link 
                to={`/clients/${project.clientId}`}
                className="text-sm hover:underline"
              >
                {project.clientName}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-4">
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
                      <Badge variant="success">Completed</Badge>
                    ) : (
                      <Badge variant="secondary">In Progress</Badge>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Client</dt>
                  <dd className="text-lg">{project.clientName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Days Allocated</dt>
                  <dd className="text-lg">{project.daysAllocated} days</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="pt-4">
          {isTasksLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : tasks && tasks.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Project Tasks</h3>
                <Button size="sm" asChild>
                  <Link to={`/tasks?projectId=${projectId}`}>
                    <Plus className="mr-1 h-4 w-4" /> Add Task
                  </Link>
                </Button>
              </div>
              <div className="divide-y rounded-md border">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4">
                    <div className="flex items-start gap-3">
                      {task.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500" />
                      )}
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                    <Badge variant={task.status === "completed" ? "outline" : "secondary"}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-3 text-lg font-medium">No tasks yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Create tasks to track project progress.</p>
                <Button className="mt-4" asChild>
                  <Link to={`/tasks?projectId=${projectId}`}>
                    <Plus className="mr-1 h-4 w-4" /> Add Task
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
