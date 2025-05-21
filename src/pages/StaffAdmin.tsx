
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Settings, Key } from "lucide-react";
import RolesPermissionsContent from "@/components/settings/RolesPermissionsContent";
import StaffUsersContent from "@/components/staff/StaffUsersContent";
import SystemSettingsContent from "@/components/staff/SystemSettingsContent";

const StaffAdmin = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          Staff Administration
        </h1>
        <p className="text-muted-foreground">
          Central control panel for system administrators with elevated privileges
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Control</CardTitle>
          <CardDescription>
            Manage users, roles, and system settings from this central administrative dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>User Management</span>
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                <span>Roles & Permissions</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>System Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <StaffUsersContent />
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <RolesPermissionsContent />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <SystemSettingsContent />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAdmin;
