
import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Document template interface
export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fileType: string;
  tags: string[];
}

interface DocumentTemplatesProps {
  triggerClassName?: string;
}

const DocumentTemplates = ({ triggerClassName }: DocumentTemplatesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Document templates
  const documentTemplates: DocumentTemplate[] = [
    {
      id: "doc-template1",
      name: "Client Contract",
      description: "Standard contract template for client engagements",
      category: "Contracts",
      fileType: "docx",
      tags: ["Legal", "Contract"]
    },
    {
      id: "doc-template2",
      name: "Project Brief",
      description: "Template for documenting project requirements",
      category: "Proposals",
      fileType: "docx",
      tags: ["Project", "Planning"]
    },
    {
      id: "doc-template3",
      name: "Financial Report",
      description: "Template for financial reporting",
      category: "Financial",
      fileType: "xlsx",
      tags: ["Finance", "Reports"]
    },
    {
      id: "doc-template4",
      name: "Marketing Plan",
      description: "Template for marketing strategy and planning",
      category: "Marketing",
      fileType: "pptx",
      tags: ["Marketing", "Strategy"]
    },
    {
      id: "doc-template5",
      name: "Meeting Minutes",
      description: "Template for recording meeting notes",
      category: "Meetings",
      fileType: "docx",
      tags: ["Meeting", "Notes"]
    }
  ];
  
  // Filter templates based on search term
  const filteredTemplates = documentTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Handle template download
  const handleDownload = (templateId: string) => {
    const template = documentTemplates.find(t => t.id === templateId);
    if (template) {
      toast({
        title: "Template Downloaded",
        description: `Downloaded "${template.name}" template successfully.`,
      });
    }
  };
  
  // Get file icon class based on file type
  const getFileTypeClasses = (fileType: string) => {
    switch (fileType) {
      case "docx":
        return "bg-blue-100 text-blue-800";
      case "xlsx":
        return "bg-green-100 text-green-800";
      case "pptx":
        return "bg-orange-100 text-orange-800";
      case "pdf":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={`flex items-center gap-2 ${triggerClassName}`}>
          <Download className="h-4 w-4" />
          Document Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Document Templates</DialogTitle>
          <DialogDescription>
            Choose from our collection of professional document templates.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto py-2">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-md flex items-center gap-2">
                    {template.name}
                    <Badge className={`${getFileTypeClasses(template.fileType)}`}>
                      {template.fileType.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{template.category}</span>
                    <Button 
                      size="sm" 
                      onClick={() => handleDownload(template.id)}
                      className="text-xs"
                    >
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 flex items-center justify-center p-8 text-center border border-dashed rounded-lg">
              <p className="text-muted-foreground">No templates found. Try a different search term.</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentTemplates;
