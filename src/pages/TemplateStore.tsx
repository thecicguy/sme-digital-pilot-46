
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DocumentTemplates from "@/components/documents/DocumentTemplates";

// Import document template interface for type consistency
import type { DocumentTemplate } from "@/components/documents/DocumentTemplates";

// Define email template interface
interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: Date;
  lastUsed: Date | null;
  tags: string[];
}

const TemplateStore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  // Email templates data
  const emailTemplates: EmailTemplate[] = [
    {
      id: "intro-email",
      name: "Introduction Email",
      description: "Template for introducing services to new clients",
      category: "Client Outreach",
      createdAt: new Date("2023-05-15"),
      lastUsed: new Date("2023-06-10"),
      tags: ["Introduction", "New Client"]
    },
    {
      id: "meeting-invite",
      name: "Meeting Kick-Off Invite",
      description: "Template for scheduling an initial meeting with clients",
      category: "Meetings",
      createdAt: new Date("2023-05-20"),
      lastUsed: new Date("2023-06-18"),
      tags: ["Meeting", "Calendar"]
    },
    {
      id: "follow-up",
      name: "Follow-Up Email",
      description: "Template for following up after meetings",
      category: "Client Management",
      createdAt: new Date("2023-05-25"),
      lastUsed: null,
      tags: ["Follow-up", "Meeting"]
    },
    {
      id: "task-assignment",
      name: "Task Assignment",
      description: "Template for assigning tasks to client contacts",
      category: "Project Management",
      createdAt: new Date("2023-06-01"),
      lastUsed: new Date("2023-06-15"),
      tags: ["Tasks", "Assignment"]
    },
    {
      id: "deliverable-request",
      name: "Deliverable Request",
      description: "Template for requesting deliverables from clients",
      category: "Project Management",
      createdAt: new Date("2023-06-05"),
      lastUsed: null,
      tags: ["Deliverable", "Client Request"]
    }
  ];

  // Document templates data is imported from DocumentTemplates component

  // Filter email templates based on search term
  const filteredEmailTemplates = emailTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle template download
  const handleEmailTemplateDownload = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      toast({
        title: "Template Downloaded",
        description: `Downloaded "${template.name}" template successfully.`,
      });
    }
  };

  // Get category badge classes
  const getCategoryBadgeClasses = (category: string) => {
    switch (category) {
      case "Client Outreach":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Meetings":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "Client Management":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Project Management":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Template Store</h1>
          <p className="text-muted-foreground">Browse and use ready-made templates for documents and emails</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-800">
            Upload Template
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-100 dark:bg-slate-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700">
            All Templates
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700">
            <FileText className="mr-2 h-4 w-4" />
            Document Templates
          </TabsTrigger>
          <TabsTrigger value="emails" className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700">
            <Mail className="mr-2 h-4 w-4" />
            Email Templates
          </TabsTrigger>
        </TabsList>

        {/* All Templates Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* This is just a placeholder to encourage opening the Document Templates dialog */}
            <Card className="overflow-hidden border border-dashed bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-600" />
                  Browse Document Templates
                </CardTitle>
                <CardDescription>Click to open document templates library</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <DocumentTemplates triggerClassName="w-full mt-4" />
              </CardContent>
            </Card>
            
            {/* Email templates */}
            {filteredEmailTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <CardHeader className="p-4 pb-2 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
                  <div className="flex items-center justify-between mb-1">
                    <Badge className={getCategoryBadgeClasses(template.category)}>
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Email
                    </Badge>
                  </div>
                  <CardTitle className="text-md">{template.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>Created: {template.createdAt.toLocaleDateString()}</span>
                    <span>Last used: {template.lastUsed ? template.lastUsed.toLocaleDateString() : "Never"}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => handleEmailTemplateDownload(template.id)}
                    >
                      <Download className="h-4 w-4 mr-1" /> Use Template
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredEmailTemplates.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <p className="text-lg font-medium">No templates found</p>
              <p className="text-muted-foreground">Try adjusting your search or upload a new template</p>
            </div>
          )}
        </TabsContent>

        {/* Document Templates Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-center p-8">
            <DocumentTemplates />
          </div>
        </TabsContent>

        {/* Email Templates Tab */}
        <TabsContent value="emails" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredEmailTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <CardHeader className="p-4 pb-2 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
                  <div className="flex items-center justify-between mb-1">
                    <Badge className={getCategoryBadgeClasses(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-md">{template.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>Created: {template.createdAt.toLocaleDateString()}</span>
                    <span>Last used: {template.lastUsed ? template.lastUsed.toLocaleDateString() : "Never"}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => handleEmailTemplateDownload(template.id)}
                    >
                      <Download className="h-4 w-4 mr-1" /> Use Template
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredEmailTemplates.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <p className="text-lg font-medium">No email templates found</p>
                <p className="text-muted-foreground">Try adjusting your search or upload a new template</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateStore;
