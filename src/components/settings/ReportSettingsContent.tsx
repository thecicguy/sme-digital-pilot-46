
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import ReportTypesContent from "./ReportTypesContent";
import StatusesContent from "./StatusesContent";
import KanbanSettingsContent from "./KanbanSettingsContent";

const ReportSettingsContent = () => {
  const [activeTab, setActiveTab] = useState("types");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>
          Configure report types, statuses, and kanban settings for your organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="mb-6 w-full md:w-auto">
            <TabsTrigger value="types">Report Types</TabsTrigger>
            <TabsTrigger value="statuses">Report Statuses</TabsTrigger>
            <TabsTrigger value="kanban">Kanban Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="types" className="mt-6">
            <ReportTypesContent />
          </TabsContent>
          
          <TabsContent value="statuses" className="mt-6">
            <StatusesContent />
          </TabsContent>
          
          <TabsContent value="kanban" className="mt-6">
            <KanbanSettingsContent />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportSettingsContent;
