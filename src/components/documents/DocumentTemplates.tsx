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
  
  // Get file type class based on file type
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
        <Button variant="outline" className={`flex items-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-900 ${triggerClassName}`}>
          <Download className="h-4 w-4" />
          Document Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 -m-4 p-4 mb-0 rounded-t-lg">
          <DialogTitle className="text-xl font-bold text-indigo-900 dark:text-indigo-200">Document Templates</DialogTitle>
          <DialogDescription className="text-indigo-700/80 dark:text-indigo-300/80">
            Choose from our collection of professional document templates.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 px-2">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-slate-300 dark:border-slate-600"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto py-2 px-2">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border-slate-200 dark:border-slate-700">
                <CardHeader className="p-3 pb-0 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
                  <CardTitle className="text-md flex items-center gap-2 text-slate-900 dark:text-slate-50">
                    {template.name}
                    <Badge className={`${getFileTypeClasses(template.fileType)} ml-auto`}>
                      {template.fileType.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{template.category}</span>
                    <Button 
                      size="sm" 
                      onClick={() => handleDownload(template.id)}
                      className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
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
        
        <DialogFooter className="bg-slate-50 dark:bg-slate-800 -m-4 mt-0 p-4 pt-2 rounded-b-lg">
          <Button variant="outline">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentTemplates;
