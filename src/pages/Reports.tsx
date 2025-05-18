import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the interfaces consistent with the settings page
interface ReportTypeInfo {
  name: string;
  presentationType: string;
}

interface StatusInfo {
  name: string;
  colorScheme: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  thumbnail: string;
}

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();
  
  // Updated report types with presentation type
  const reportTypes: ReportTypeInfo[] = [
    { name: "Update", presentationType: "meeting" },
    { name: "Pitch", presentationType: "slidedeck" },
    { name: "Standup", presentationType: "meeting" },
    { name: "Proposal", presentationType: "document" },
    { name: "Kanban", presentationType: "board" },
    { name: "KickOff", presentationType: "meeting" },
    { name: "Lessons Learnt", presentationType: "document" },
  ];
  
  // Define statuses consistent with status settings
  const statuses: StatusInfo[] = [
    { name: "completed", colorScheme: "green" },
    { name: "in_progress", colorScheme: "blue" },
    { name: "draft", colorScheme: "orange" },
  ];
  
  // Report templates
  const reportTemplates: ReportTemplate[] = [
    {
      id: "template1",
      name: "Client Onboarding",
      description: "Standard template for onboarding new clients",
      type: "Proposal",
      thumbnail: "client-onboarding.png"
    },
    {
      id: "template2",
      name: "Weekly Progress",
      description: "Template for weekly project updates",
      type: "Update",
      thumbnail: "weekly-progress.png"
    },
    {
      id: "template3",
      name: "Project Kickoff",
      description: "Comprehensive template for starting new projects",
      type: "KickOff",
      thumbnail: "project-kickoff.png"
    },
    {
      id: "template4",
      name: "Executive Summary",
      description: "Brief overview template for executives",
      type: "Standup",
      thumbnail: "executive-summary.png"
    },
    {
      id: "template5",
      name: "Final Delivery",
      description: "Template for project completion and handover",
      type: "Lessons Learnt",
      thumbnail: "final-delivery.png"
    }
  ];
  
  // Updated reports with the new structure
  const reports = [
    {
      id: "report1",
      title: "City Boutique Implementation Plan",
      clientName: "City Boutique",
      generatedAt: new Date("2023-06-15"),
      status: "completed",
      aiModel: "GPT-4",
      type: "Proposal",
    },
    {
      id: "report2",
      title: "Gourmet Group Business Proposal",
      clientName: "Gourmet Group",
      generatedAt: new Date("2023-05-28"),
      status: "completed",
      aiModel: "GPT-4",
      type: "Pitch",
    },
    {
      id: "report3",
      title: "Apex Consulting Preliminary Analysis",
      clientName: "Apex Consulting",
      generatedAt: new Date("2023-06-10"),
      status: "draft",
      aiModel: "Claude",
      type: "Update",
    },
    {
      id: "report4",
      title: "Tech Solutions Procurement Plan",
      clientName: "Tech Solutions",
      generatedAt: new Date("2023-06-20"),
      status: "in_progress",
      aiModel: "GPT-4",
      type: "Standup",
    },
  ];
  
  // Function to get presentation type by report type name
  const getPresentationType = (typeName: string): string => {
    const reportType = reportTypes.find(type => type.name === typeName);
    return reportType?.presentationType || "unknown";
  };
  
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const getStatusBadgeClasses = (statusName: string) => {
    const status = statuses.find(s => s.name === statusName);
    if (!status) return "bg-gray-100 text-gray-800";
    
    switch (status.colorScheme) {
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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusLabel = (statusName: string) => {
    // Capitalize status name for display
    return statusName.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to get presentation type badge classes
  const getPresentationTypeBadgeClasses = (presentationType: string) => {
    switch (presentationType) {
      case "slidedeck":
        return "bg-purple-100 text-purple-800";
      case "meeting":
        return "bg-blue-100 text-blue-800";
      case "document":
        return "bg-green-100 text-green-800";
      case "board":
        return "bg-yellow-100 text-yellow-800";
      case "update":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to handle template download
  const handleTemplateDownload = (templateId: string) => {
    const template = reportTemplates.find(t => t.id === templateId);
    if (template) {
      toast({
        title: "Template Downloaded",
        description: `Downloaded "${template.name}" template successfully.`,
      });
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and manage AI-powered client reports</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Report Templates</DialogTitle>
                <DialogDescription>
                  Choose from our collection of professional templates to get started quickly.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-md">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                        <span className="text-xs text-muted-foreground">Template Preview</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`rounded-full px-2 py-1 text-xs ${getPresentationTypeBadgeClasses(getPresentationType(template.type))}`}>
                          {template.type}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleTemplateDownload(template.id)}
                          className="text-xs"
                        >
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>Generate New Report</Button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <Input
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status.name} value={status.name}>
                {getStatusLabel(status.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Report Types</SelectItem>
            {reportTypes.map((type) => (
              <SelectItem key={type.name} value={type.name}>{type.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredReports.map((report) => (
          <Card key={report.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="truncate">{report.title}</CardTitle>
              <CardDescription>Client: {report.clientName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClasses(report.status)}`}>
                    {getStatusLabel(report.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{report.type}</span>
                    <span className={`rounded-full px-2 py-1 text-xs ${getPresentationTypeBadgeClasses(getPresentationType(report.type))}`}>
                      {getPresentationType(report.type)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Generated</span>
                  <span className="text-sm">{report.generatedAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Model</span>
                  <span className="text-sm">{report.aiModel}</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">View</Button>
                  <Button size="sm" variant="outline" className="flex-1">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredReports.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-lg font-medium">No reports found</p>
            <p className="text-muted-foreground">Try adjusting your search filters or generate a new report</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
