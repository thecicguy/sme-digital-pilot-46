import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks, fetchClients, fetchProjects } from "@/lib/api";
import { format } from "date-fns";
import { Search, Plus, Calendar, CheckCircle, Clock, AlertCircle, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewToggle } from "@/components/common/ViewToggle";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import KanbanBoard from "@/components/tasks/KanbanBoard";

const statusIcons = {
  "doing": <Clock className="h-4 w-4 text-crm-blue" />,
  "done": <CheckCircle className="h-4 w-4 text-green-500" />,
  "for_review": <AlertCircle className="h-4 w-4 text-amber-500" />,
  "deferred": <PauseCircle className="h-4 w-4 text-gray-500" />
};

const statusLabels = {
  "doing": "In Progress",
  "done": "Completed",
  "for_review": "For Review",
  "deferred": "Deferred"
};

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProjectId, setFilterProjectId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list" | "kanban">("kanban");

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  const getClientName = (projectId: string) => {
    const project = projects?.find(p => p.id === projectId);
    if (!project) return "Unknown Client";
    
    const client = clients?.find(c => c.id === project.clientId);
    return client?.businessName || "Unknown Client";
  };

  const getProjectName = (projectId: string) => {
    const project = projects?.find(p => p.id === projectId);
    return project?.type || "Unknown Project";
  };

  const filterTasksByTab = (tasks = []) => {
    if (activeTab === "all") return tasks;
    return tasks.filter(task => task.status === activeTab);
  };

  const filteredTasks = tasks
    ? filterTasksByTab(tasks).filter(task => {
        const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProject = filterProjectId ? task.projectId === filterProjectId : true;
        const matchesStatus = filterStatus ? task.status === filterStatus : true;
        return matchesSearch && matchesProject && matchesStatus;
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage and track all project tasks</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="doing">In Progress</TabsTrigger>
          <TabsTrigger value="for_review">For Review</TabsTrigger>
          <TabsTrigger value="done">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterProjectId} onValueChange={setFilterProjectId}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Projects</SelectItem>
            {projects?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {getProjectName(project.id)} - {getClientName(project.id)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ViewToggle view={view} onViewChange={setView} showKanban={true} />
      </div>

      {isTasksLoading ? (
        view === "kanban" ? (
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted/40 rounded-lg p-3 min-w-[280px]">
                <Skeleton className="h-6 w-24 mb-3" />
                {[1, 2].map((j) => (
                  <Card key={j} className="mb-2">
                    <CardHeader className="p-3 pb-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-2/3 mt-2" />
                    </CardHeader>
                    <CardFooter className="p-3 pt-1">
                      <Skeleton className="h-7 w-16 ml-auto" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-8 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
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
              {[1, 2, 3].map((i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-9 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-lg border border-border bg-background p-8 text-center">
          <h3 className="mb-2 text-lg font-medium">No tasks found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterProjectId || filterStatus || activeTab !== "all"
              ? "Try adjusting your filters."
              : "Create a new task to get started."}
          </p>
          {!searchTerm && !filterProjectId && !filterStatus && activeTab === "all" && (
            <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          )}
        </div>
      ) : view === "kanban" ? (
        <KanbanBoard 
          tasks={filteredTasks} 
          getProjectName={getProjectName} 
          getClientName={getClientName} 
        />
      ) : view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
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
      ) : (
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
            {filteredTasks.map((task) => (
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
      )}

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
};

export default Tasks;
