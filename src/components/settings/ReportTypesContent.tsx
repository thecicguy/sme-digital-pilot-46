
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
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

// Define a report type interface with name, presentation type, and AI model
interface ReportTypeInfo {
  name: string;
  presentationType: string;
  aiModel?: string;
}

const ReportTypesContent = () => {
  // Updated to include aiModel property
  const [reportTypes, setReportTypes] = useState<ReportTypeInfo[]>([
    { name: "Update", presentationType: "meeting", aiModel: "gpt-4" },
    { name: "Pitch", presentationType: "slidedeck", aiModel: "claude" },
    { name: "Standup", presentationType: "meeting", aiModel: "gpt-4" },
    { name: "Proposal", presentationType: "document", aiModel: "palm" },
    { name: "Kanban", presentationType: "board", aiModel: "gpt-4" },
    { name: "KickOff", presentationType: "meeting", aiModel: "claude" },
    { name: "Lessons Learnt", presentationType: "document", aiModel: "llama" }
  ]);
  
  const [newReportType, setNewReportType] = useState("");
  const [newPresentationType, setNewPresentationType] = useState("slidedeck");
  const [newAiModel, setNewAiModel] = useState("gpt-4");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPresentationType, setEditPresentationType] = useState("");
  const [editAiModel, setEditAiModel] = useState("");
  
  // Available presentation types
  const presentationTypes = [
    "slidedeck",
    "meeting",
    "document",
    "board",
    "update"
  ];
  
  // Available AI models
  const aiModels = [
    "gpt-4",
    "claude",
    "palm",
    "llama"
  ];
  
  const handleAddReportType = () => {
    if (!newReportType.trim()) {
      toast({
        title: "Error",
        description: "Report type cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    if (reportTypes.some(type => type.name.toLowerCase() === newReportType.trim().toLowerCase())) {
      toast({
        title: "Error",
        description: "This report type already exists",
        variant: "destructive",
      });
      return;
    }
    
    setReportTypes([...reportTypes, { 
      name: newReportType.trim(), 
      presentationType: newPresentationType,
      aiModel: newAiModel
    }]);
    setNewReportType("");
    setNewPresentationType("slidedeck"); // Reset to default
    setNewAiModel("gpt-4"); // Reset to default
    
    toast({
      title: "Report Type Added",
      description: `"${newReportType.trim()}" has been added to report types`,
    });
  };
  
  const handleDeleteReportType = (index: number) => {
    const updatedTypes = [...reportTypes];
    const deletedType = updatedTypes[index].name;
    updatedTypes.splice(index, 1);
    setReportTypes(updatedTypes);
    
    toast({
      title: "Report Type Deleted",
      description: `"${deletedType}" has been removed from report types`,
    });
  };
  
  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditName(reportTypes[index].name);
    setEditPresentationType(reportTypes[index].presentationType);
    setEditAiModel(reportTypes[index].aiModel || "gpt-4");
  };
  
  const handleSaveEdit = () => {
    if (editIndex === null) return;
    
    if (!editName.trim()) {
      toast({
        title: "Error",
        description: "Report type name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const nameExists = reportTypes.some(
      (type, i) => i !== editIndex && type.name.toLowerCase() === editName.trim().toLowerCase()
    );
    
    if (nameExists) {
      toast({
        title: "Error",
        description: "This report type name already exists",
        variant: "destructive",
      });
      return;
    }
    
    const updatedTypes = [...reportTypes];
    const oldValue = updatedTypes[editIndex].name;
    updatedTypes[editIndex] = { 
      name: editName.trim(), 
      presentationType: editPresentationType,
      aiModel: editAiModel 
    };
    setReportTypes(updatedTypes);
    setEditIndex(null);
    
    toast({
      title: "Report Type Updated",
      description: `"${oldValue}" has been updated to "${editName.trim()}"`,
    });
  };
  
  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="new-report-type">Report Type Name</Label>
            <Input
              id="new-report-type"
              placeholder="Add new report type..."
              value={newReportType}
              onChange={(e) => setNewReportType(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="new-presentation-type">Presentation Type</Label>
            <Select 
              value={newPresentationType} 
              onValueChange={setNewPresentationType}
            >
              <SelectTrigger id="new-presentation-type" className="mt-1">
                <SelectValue placeholder="Select presentation type" />
              </SelectTrigger>
              <SelectContent>
                {presentationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="new-ai-model">AI Model</Label>
            <Select 
              value={newAiModel} 
              onValueChange={setNewAiModel}
            >
              <SelectTrigger id="new-ai-model" className="mt-1">
                <SelectValue placeholder="Select AI model" />
              </SelectTrigger>
              <SelectContent>
                {aiModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAddReportType}>Add Type</Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        {reportTypes.length > 0 ? (
          <ul className="divide-y">
            {reportTypes.map((type, index) => (
              <li key={index} className="p-3 flex items-center justify-between">
                {editIndex === index ? (
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        className="max-w-full"
                      />
                    </div>
                    <div>
                      <Select 
                        value={editPresentationType} 
                        onValueChange={setEditPresentationType}
                      >
                        <SelectTrigger className="max-w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {presentationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={editAiModel} 
                        onValueChange={setEditAiModel}
                      >
                        <SelectTrigger className="max-w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aiModels.map((model) => (
                            <SelectItem key={model} value={model}>
                              {model.toUpperCase()}
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
                      <span className="font-medium">{type.name}</span>
                      <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-muted-foreground">
                        <span>{type.presentationType.charAt(0).toUpperCase() + type.presentationType.slice(1)}</span>
                        <span className="bg-muted px-2 py-1 rounded text-xs font-medium">
                          {type.aiModel?.toUpperCase() || 'GPT-4'}
                        </span>
                      </div>
                    </div>
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
  );
};

export default ReportTypesContent;
