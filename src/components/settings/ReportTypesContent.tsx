import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { X, Edit, Check } from "lucide-react";

const ReportTypesContent = () => {
  const [reportTypes, setReportTypes] = useState([
    "Update",
    "Pitch",
    "Standup",
    "Proposal",
    "Kanban",
    "KickOff",
    "Lessons Learnt"
  ]);
  const [newReportType, setNewReportType] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  
  const handleAddReportType = () => {
    if (!newReportType.trim()) {
      toast({
        title: "Error",
        description: "Report type cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    if (reportTypes.includes(newReportType.trim())) {
      toast({
        title: "Error",
        description: "This report type already exists",
        variant: "destructive",
      });
      return;
    }
    
    setReportTypes([...reportTypes, newReportType.trim()]);
    setNewReportType("");
    
    toast({
      title: "Report Type Added",
      description: `"${newReportType.trim()}" has been added to report types`,
    });
  };
  
  const handleDeleteReportType = (index: number) => {
    const updatedTypes = [...reportTypes];
    const deletedType = updatedTypes[index];
    updatedTypes.splice(index, 1);
    setReportTypes(updatedTypes);
    
    toast({
      title: "Report Type Deleted",
      description: `"${deletedType}" has been removed from report types`,
    });
  };
  
  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditValue(reportTypes[index]);
  };
  
  const handleSaveEdit = () => {
    if (editIndex === null) return;
    
    if (!editValue.trim()) {
      toast({
        title: "Error",
        description: "Report type cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    if (reportTypes.includes(editValue.trim()) && editValue.trim() !== reportTypes[editIndex]) {
      toast({
        title: "Error",
        description: "This report type already exists",
        variant: "destructive",
      });
      return;
    }
    
    const updatedTypes = [...reportTypes];
    const oldValue = updatedTypes[editIndex];
    updatedTypes[editIndex] = editValue.trim();
    setReportTypes(updatedTypes);
    setEditIndex(null);
    
    toast({
      title: "Report Type Updated",
      description: `"${oldValue}" has been updated to "${editValue.trim()}"`,
    });
  };
  
  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Types</CardTitle>
        <CardDescription>
          Manage report types available for selection when creating reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex space-x-2">
            <Input
              placeholder="Add new report type..."
              value={newReportType}
              onChange={(e) => setNewReportType(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleAddReportType}>Add Type</Button>
          </div>
          
          <div className="border rounded-md">
            {reportTypes.length > 0 ? (
              <ul className="divide-y">
                {reportTypes.map((type, index) => (
                  <li key={index} className="p-3 flex items-center justify-between">
                    {editIndex === index ? (
                      <div className="flex-1 flex items-center space-x-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                          className="max-w-md"
                        />
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span>{type}</span>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" onClick={() => handleEditClick(index)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDeleteReportType(index)}>
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
                <p className="text-muted-foreground">No report types added yet</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTypesContent;
