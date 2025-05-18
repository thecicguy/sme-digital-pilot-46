
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchClients, fetchProjects, fetchTasks } from "@/lib/api";
import { format, isToday, isTomorrow } from "date-fns";
import { Users, Building, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const { data: clients, isLoading: isClientsLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  });

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  // Filter tasks due today or tomorrow
  const upcomingTasks = tasks?.filter(
    (task) => isToday(new Date(task.dueDate)) || isTomorrow(new Date(task.dueDate))
  );

  // Get latest clients (most recently created)
  const latestClients = clients
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Get latest projects (most recently created)
  const latestProjects = projects
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your CRM dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Overview Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Active client relationships
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Projects in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingTasks?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Tasks due today or tomorrow
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Latest Clients */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Latest Clients</CardTitle>
              <CardDescription>
                Your most recently added clients
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isClientsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : latestClients?.length === 0 ? (
              <p className="text-sm text-muted-foreground">No clients found</p>
            ) : (
              <div className="space-y-2">
                {latestClients?.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <h3 className="font-medium">{client.businessName}</h3>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {client.description}
                      </p>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/clients/${client.id}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/clients">View All Clients</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Latest Projects */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Latest Projects</CardTitle>
              <CardDescription>
                Your most recently added projects
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isProjectsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : latestProjects?.length === 0 ? (
              <p className="text-sm text-muted-foreground">No projects found</p>
            ) : (
              <div className="space-y-2">
                {latestProjects?.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <h3 className="font-medium capitalize">{project.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        <Badge variant="outline">{project.daysAllocated} days</Badge>
                      </p>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/projects/${project.id}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Tasks due today and tomorrow
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isTasksLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : upcomingTasks?.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No tasks due in the next two days</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingTasks?.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.description}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={isToday(new Date(task.dueDate)) ? "destructive" : "outline"}
                          className="text-xs"
                        >
                          {isToday(new Date(task.dueDate)) ? "Today" : "Tomorrow"}: {format(new Date(task.dueDate), "MMM d")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="capitalize"
                          variant={
                            task.status === "done"
                              ? "default"
                              : task.status === "for_review"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {task.status === "for_review" ? "For Review" : task.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/tasks">View All Tasks</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
