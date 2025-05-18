import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { X, Edit, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Interface for status with name and color scheme
interface StatusInfo {
  name: string;
  colorScheme: string;
}

const StatusesContent = () => {
  // Initial set of statuses
  const [statuses, setStatuses] = useState<StatusInfo[]>([
    { name: "completed", colorScheme: "green" },
    { name: "in_progress", colorScheme: "blue" },
    { name: "draft", colorScheme: "orange" },
  ]);
  
  const [newStatusName, setNewStatusName] = useState("");
  const [newColorScheme, setNewColorScheme] = useState("green");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editColorScheme, setEditColorScheme] = useState("");
  
  // Available color schemes
  const colorSchemes = [
    "green",
    "blue",
    "orange",
    "red",
    "purple",
    "yellow",
    "gray"
  ];
  
  const handleAddStatus = () => {
    if (!newStatusName.trim()) {
      toast({
        title: "Error",
        description: "Status name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    if (statuses.some(status => status.name.toLowerCase() === newStatusName.trim().toLowerCase())) {
      toast({
        title: "Error",
        description: "This status already exists",
        variant: "destructive",
      });
      return;
    }
    
    setStatuses([...statuses, { 
      name: newStatusName.trim(), 
      colorScheme: newColorScheme 
    }]);
    setNewStatusName("");
    setNewColorScheme("green"); // Reset to default
    
    toast({
      title: "Status Added",
      description: `"${newStatusName.trim()}" has been added to statuses`,
    });
  };
  
  const handleDeleteStatus = (index: number) => {
    const updatedStatuses = [...statuses];
    const deletedStatus = updatedStatuses[index].name;
    updatedStatuses.splice(index, 1);
    setStatuses(updatedStatuses);
    
    toast({
      title: "Status Deleted",
      description: `"${deletedStatus}" has been removed from statuses`,
    });
  };
  
  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditName(statuses[index].name);
    setEditColorScheme(statuses[index].colorScheme);
  };
  
  const handleSaveEdit = () => {
    if (editIndex === null) return;
    
    if (!editName.trim()) {
      toast({
        title: "Error",
        description: "Status name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const nameExists = statuses.some(
      (status, i) => i !== editIndex && status.name.toLowerCase() === editName.trim().toLowerCase()
    );
    
    if (nameExists) {
      toast({
        title: "Error",
        description: "This status name already exists",
        variant: "destructive",
      });
      return;
    }
    
    const updatedStatuses = [...statuses];
    const oldValue = updatedStatuses[editIndex].name;
    updatedStatuses[editIndex] = { 
      name: editName.trim(), 
      colorScheme: editColorScheme 
    };
    setStatuses(updatedStatuses);
    setEditIndex(null);
    
    toast({
      title: "Status Updated",
      description: `"${oldValue}" has been updated to "${editName.trim()}"`,
    });
  };
  
  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  // Preview function to show color scheme
  const getColorPreviewClasses = (colorScheme: string) => {
    switch (colorScheme) {
      case "green":
        return "bg-green-100 text-green-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "orange":
        return "bg-orange-100 text-orange-800";
      case "red":
        return "bg-red-100 text-red-800";
      case "purple":
        return "bg-purple-100 text-purple-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "gray":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="new-status-name">Status Name</Label>
            <Input
              id="new-status-name"
              placeholder="Add new status..."
              value={newStatusName}
              onChange={(e) => setNewStatusName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="new-color-scheme">Color Scheme</Label>
            <Select 
              value={newColorScheme} 
              onValueChange={setNewColorScheme}
            >
              <SelectTrigger id="new-color-scheme" className="mt-1">
                <SelectValue placeholder="Select color scheme" />
              </SelectTrigger>
              <SelectContent>
                {colorSchemes.map((color) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-3 h-3 rounded-full bg-${color}-500`}></span>
                      <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAddStatus}>Add Status</Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        {statuses.length > 0 ? (
          <ul className="divide-y">
            {statuses.map((status, index) => (
              <li key={index} className="p-3 flex items-center justify-between">
                {editIndex === index ? (
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        className="max-w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={editColorScheme} 
                        onValueChange={setEditColorScheme}
                      >
                        <SelectTrigger className="max-w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {colorSchemes.map((color) => (
                            <SelectItem key={color} value={color}>
                              <div className="flex items-center gap-2">
                                <span className={`inline-block w-3 h-3 rounded-full bg-${color}-500`}></span>
                                <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-medium">{status.name}</span>
                      <span className={`rounded-full px-2 py-1 text-xs ${getColorPreviewClasses(status.colorScheme)}`}>
                        {status.name.charAt(0).toUpperCase() + status.name.slice(1)}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" onClick={() => handleEditClick(index)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteStatus(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No statuses added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusesContent;
