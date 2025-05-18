
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarTrigger 
} from "@/components/ui/menubar";
import { Clock, CheckCircle, AlertCircle, PauseCircle, MoreHorizontal } from "lucide-react";
import { statusIcons, statusLabels } from "@/components/tasks/taskUtils";
import { toast } from "sonner";

const KanbanSettingsContent = () => {
  const [kanbanColumns, setKanbanColumns] = useState([
    {
      id: "doing",
      name: "In Progress",
      icon: <Clock className="h-4 w-4 text-crm-blue" />,
      color: "text-crm-blue"
    },
    {
      id: "for_review",
      name: "For Review",
      icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
      color: "text-amber-500"
    },
    {
      id: "done",
      name: "Completed",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      color: "text-green-500"
    },
    {
      id: "deferred",
      name: "Deferred",
      icon: <PauseCircle className="h-4 w-4 text-gray-500" />,
      color: "text-gray-500"
    }
  ]);

  const handleSave = () => {
    toast.success("Kanban settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Kanban Board Options</h3>
      <p className="text-sm text-muted-foreground">
        Customize the columns available in your Kanban board view.
      </p>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Column Name</TableHead>
                <TableHead>Status ID</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kanbanColumns.map((column) => (
                <TableRow key={column.id}>
                  <TableCell className="w-12">
                    <div className="flex items-center justify-center">
                      {column.icon}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{column.name}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{column.id}</TableCell>
                  <TableCell>
                    <Menubar className="border-0 p-0">
                      <MenubarMenu>
                        <MenubarTrigger className="p-1 cursor-pointer">
                          <MoreHorizontal className="h-4 w-4" />
                        </MenubarTrigger>
                        <MenubarContent className="min-w-[160px]">
                          <MenubarItem>Edit</MenubarItem>
                          <MenubarItem className="text-destructive">Delete</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-base font-medium mb-2">Add New Column</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="column-name">Column Name</Label>
              <Input id="column-name" placeholder="Enter column name" />
            </div>
            <div>
              <Label htmlFor="column-id">Status ID</Label>
              <Input id="column-id" placeholder="Enter status ID" />
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">Add Column</Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default KanbanSettingsContent;
