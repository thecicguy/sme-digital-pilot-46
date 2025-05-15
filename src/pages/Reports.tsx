
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

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const reports = [
    {
      id: "report1",
      title: "City Boutique Implementation Plan",
      clientName: "City Boutique",
      generatedAt: new Date("2023-06-15"),
      status: "completed",
      aiModel: "GPT-4",
    },
    {
      id: "report2",
      title: "Gourmet Group Business Proposal",
      clientName: "Gourmet Group",
      generatedAt: new Date("2023-05-28"),
      status: "completed",
      aiModel: "GPT-4",
    },
    {
      id: "report3",
      title: "Apex Consulting Preliminary Analysis",
      clientName: "Apex Consulting",
      generatedAt: new Date("2023-06-10"),
      status: "draft",
      aiModel: "Claude",
    },
    {
      id: "report4",
      title: "Tech Solutions Procurement Plan",
      clientName: "Tech Solutions",
      generatedAt: new Date("2023-06-20"),
      status: "in_progress",
      aiModel: "GPT-4",
    },
  ];
  
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and manage AI-powered client reports</p>
        </div>
        <Button>Generate New Report</Button>
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
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
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
