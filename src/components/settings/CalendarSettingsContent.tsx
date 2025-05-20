
import { useState } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { CalendarPlus, Pencil, Save, Trash2 } from "lucide-react";

interface CalendarEventType {
  id: string;
  name: string;
  color: string;
}

const CalendarSettingsContent = () => {
  const [eventTypes, setEventTypes] = useState<CalendarEventType[]>([
    { id: "projects", name: "Projects", color: "#3b82f6" },
    { id: "tasks", name: "Tasks", color: "#f59e0b" },
    { id: "meetings", name: "Meetings", color: "#10b981" },
    { id: "other", name: "Other", color: "#8b5cf6" }
  ]);

  const [editingType, setEditingType] = useState<CalendarEventType | null>(null);
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeColor, setNewTypeColor] = useState("#6366f1");

  const handleEditType = (type: CalendarEventType) => {
    setEditingType({ ...type });
  };

  const handleUpdateType = () => {
    if (!editingType) return;
    
    setEventTypes(prev => 
      prev.map(type => 
        type.id === editingType.id ? editingType : type
      )
    );
    
    setEditingType(null);
    toast({
      title: "Event Type Updated",
      description: `The ${editingType.name} event type has been updated.`
    });
  };

  const handleAddNewType = () => {
    if (!newTypeName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for the new event type.",
        variant: "destructive"
      });
      return;
    }

    const newType: CalendarEventType = {
      id: `type-${Date.now()}`,
      name: newTypeName,
      color: newTypeColor
    };

    setEventTypes([...eventTypes, newType]);
    setNewTypeName("");
    setNewTypeColor("#6366f1");

    toast({
      title: "Event Type Added",
      description: `${newTypeName} has been added to your calendar event types.`
    });
  };

  const handleDeleteType = (typeId: string) => {
    // Don't allow deletion of the default types
    const defaultTypes = ["projects", "tasks", "meetings", "other"];
    if (defaultTypes.includes(typeId)) {
      toast({
        title: "Cannot Delete Default Type",
        description: "Default event types cannot be removed.",
        variant: "destructive"
      });
      return;
    }

    setEventTypes(prev => prev.filter(type => type.id !== typeId));
    toast({
      title: "Event Type Deleted",
      description: "The event type has been removed."
    });
  };

  const handleSaveSettings = () => {
    // In a real application, you would save these settings to your backend
    localStorage.setItem("calendar_event_types", JSON.stringify(eventTypes));
    
    toast({
      title: "Calendar Settings Saved",
      description: "Your calendar event types have been saved."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendar Event Types</CardTitle>
          <CardDescription>
            Manage event types that appear in your calendar and customize their colors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Color</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventTypes.map(type => (
                <TableRow key={type.id}>
                  <TableCell>
                    {editingType?.id === type.id ? (
                      <Popover open={showColorPicker === type.id} onOpenChange={(open) => 
                        open ? setShowColorPicker(type.id) : setShowColorPicker(null)
                      }>
                        <PopoverTrigger asChild>
                          <div
                            className="w-6 h-6 rounded-full cursor-pointer border border-gray-300"
                            style={{ backgroundColor: editingType.color }}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <ChromePicker
                            color={editingType.color}
                            onChange={(color) => {
                              setEditingType({ ...editingType, color: color.hex });
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: type.color }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {editingType?.id === type.id ? (
                      <Input
                        value={editingType.name}
                        onChange={(e) => setEditingType({ ...editingType, name: e.target.value })}
                        className="w-full"
                      />
                    ) : (
                      type.name
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingType?.id === type.id ? (
                      <Button size="sm" onClick={handleUpdateType}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditType(type)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteType(type.id)}
                          className={["projects", "tasks", "meetings", "other"].includes(type.id) ? "opacity-50 cursor-not-allowed" : ""}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Add New Event Type</h3>
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-2">
                <Label htmlFor="color">Color</Label>
                <Popover open={showColorPicker === "new"} onOpenChange={(open) => 
                  open ? setShowColorPicker("new") : setShowColorPicker(null)
                }>
                  <PopoverTrigger asChild>
                    <div
                      className="w-8 h-8 rounded-full cursor-pointer border border-gray-300 mt-2"
                      style={{ backgroundColor: newTypeColor }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <ChromePicker
                      color={newTypeColor}
                      onChange={(color) => setNewTypeColor(color.hex)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="col-span-7">
                <Label htmlFor="name">Event Type Name</Label>
                <Input
                  id="name"
                  value={newTypeName}
                  onChange={(e) => setNewTypeName(e.target.value)}
                  placeholder="Enter event type name"
                />
              </div>
              <div className="col-span-3">
                <Button onClick={handleAddNewType} className="w-full">
                  <CalendarPlus className="h-4 w-4 mr-2" /> Add Type
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveSettings}>Save All Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarSettingsContent;
