
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, fetchClients } from "@/lib/api";
import { Plus, Search, Calendar, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClientId, setFilterClientId] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const filteredProjects = projects?.filter((project) => {
    const matchesSearch = project.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = filterClientId ? project.clientId === filterClientId : true;
    return matchesSearch && matchesClient;
  });

  const getClientName = (clientId: string) => {
    return clients?.find((client) => client.id === clientId)?.businessName || "Unknown Client";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your projects and assignments</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterClientId} onValueChange={setFilterClientId}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Clients</SelectItem>
            {clients?.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.businessName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-4">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="p-4">
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Error loading projects. Please try again later.
        </div>
      ) : filteredProjects?.length === 0 ? (
        <div className="rounded-lg border border-border bg-background p-8 text-center">
          <h3 className="mb-2 text-lg font-medium">No projects found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterClientId ? "Try adjusting your filters." : "Let's create your first project."}
          </p>
          {!searchTerm && !filterClientId && (
            <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects?.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center justify-between text-lg capitalize">
                  <span>{project.type}</span>
                  <Badge>{project.daysAllocated} days</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm">
                <div className="mb-2 flex items-center text-muted-foreground">
                  <User className="mr-1 h-4 w-4" />
                  <span>{getClientName(project.clientId)}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full">
                  <Link to={`/projects/${project.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
};

export default Projects;
