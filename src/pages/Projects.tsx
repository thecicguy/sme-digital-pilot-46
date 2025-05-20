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
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewToggle } from "@/components/common/ViewToggle";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClientId, setFilterClientId] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [view, setView] = useState<"list">("list");

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  });

  const filteredProjects = projects?.filter((project) => {
    const matchesSearch = project.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = filterClientId === "all" ? true : project.clientId === filterClientId;
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

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
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
            <SelectItem value="all">All Clients</SelectItem>
            {clients?.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.businessName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ViewToggle 
          view={view} 
          onViewChange={(newView) => {
            if (newView === "list") {
              setView(newView);
            }
          }} 
          hideGrid={true}
        />
      </div>

      {isLoading ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Type</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Days Allocated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-9 w-20 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Type</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Days Allocated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects?.map((project) => (
              <TableRow key={project.id} className="hover:bg-muted/50">
                <TableCell className="font-medium capitalize">{project.type}</TableCell>
                <TableCell>{getClientName(project.clientId)}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</TableCell>
                <TableCell>{project.daysAllocated} days</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/projects/${project.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
};

export default Projects;
