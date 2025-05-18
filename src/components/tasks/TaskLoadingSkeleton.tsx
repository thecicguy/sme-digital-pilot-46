
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TasksLoadingSkeletonProps {
  view: "grid" | "list" | "kanban";
}

const TasksLoadingSkeleton = ({ view }: TasksLoadingSkeletonProps) => {
  if (view === "kanban") {
    return (
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
    );
  }
  
  if (view === "grid") {
    return (
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
    );
  }
  
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
  );
};

export default TasksLoadingSkeleton;
