
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmailTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const templates = [
    {
      id: "intro-email",
      name: "Introduction Email",
      description: "Template for introducing services to new clients",
      createdAt: new Date("2023-05-15"),
      lastUsed: new Date("2023-06-10"),
    },
    {
      id: "meeting-invite",
      name: "Meeting Kick-Off Invite",
      description: "Template for scheduling an initial meeting with clients",
      createdAt: new Date("2023-05-20"),
      lastUsed: new Date("2023-06-18"),
    },
    {
      id: "follow-up",
      name: "Follow-Up Email",
      description: "Template for following up after meetings",
      createdAt: new Date("2023-05-25"),
      lastUsed: null,
    },
    {
      id: "task-assignment",
      name: "Task Assignment",
      description: "Template for assigning tasks to client contacts",
      createdAt: new Date("2023-06-01"),
      lastUsed: new Date("2023-06-15"),
    },
    {
      id: "deliverable-request",
      name: "Deliverable Request",
      description: "Template for requesting deliverables from clients",
      createdAt: new Date("2023-06-05"),
      lastUsed: null,
    }
  ];
  
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">Manage your email templates for client communications</p>
        </div>
        <Button>New Template</Button>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{template.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last used:</span>
                  <span>{template.lastUsed ? template.lastUsed.toLocaleDateString() : "Never"}</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                  <Button size="sm" variant="outline" className="flex-1">Use</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredTemplates.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-lg font-medium">No templates found</p>
            <p className="text-muted-foreground">Try adjusting your search or create a new template</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplates;
