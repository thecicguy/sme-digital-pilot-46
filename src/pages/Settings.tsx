
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { User, LogOut } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

// Import the content components
import ReportTypesContent from "@/components/settings/ReportTypesContent";
import StatusesContent from "@/components/settings/StatusesContent";
import ReportSettingsContent from "@/components/settings/ReportSettingsContent";
import SubscriptionsContent from "@/components/settings/SubscriptionsContent";
import RolesPermissionsContent from "@/components/settings/RolesPermissionsContent";
import EmailSettingsContent from "@/components/settings/EmailSettingsContent";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const { user, logout } = useAuth();
  
  const [profileForm, setProfileForm] = useState({
    name: "Jane Smith",
    email: "jane@serviceprovider.com",
    phone: "+1 (555) 123-4567",
    company: "Service Provider Inc.",
  });
  
  const [preferencesForm, setPreferencesForm] = useState({
    theme: "system",
    emailNotifications: true,
    reminderNotifications: true,
    taskAssignmentNotifications: true,
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSaveProfile = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Business Information Updated",
        description: "Your business information has been saved successfully.",
      });
    }, 1000);
  };
  
  const handleSavePreferences = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved successfully.",
      });
    }, 1000);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-full">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <span className="font-medium">{user?.name || "Demo User"}</span>
                <span className="text-xs text-muted-foreground">{user?.email || "demo@example.com"}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Business & Preferences</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
          <TabsTrigger value="roles-permissions">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="report-settings">Configuration</TabsTrigger>
          <TabsTrigger value="email-settings">Email Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Manage your company information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={profileForm.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Legal Entity Name</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    value={profileForm.company}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Business Info'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>
                Customize how the application looks and behaves
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={preferencesForm.theme}
                    onValueChange={(value) =>
                      setPreferencesForm({ ...preferencesForm, theme: value })
                    }
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferencesForm.emailNotifications}
                    onCheckedChange={(checked) =>
                      setPreferencesForm({ ...preferencesForm, emailNotifications: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reminder-notifications">Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive task and meeting reminders</p>
                  </div>
                  <Switch
                    id="reminder-notifications"
                    checked={preferencesForm.reminderNotifications}
                    onCheckedChange={(checked) =>
                      setPreferencesForm({ ...preferencesForm, reminderNotifications: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="task-assignment-notifications">Task Assignments</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications when assigned to tasks</p>
                  </div>
                  <Switch
                    id="task-assignment-notifications"
                    checked={preferencesForm.taskAssignmentNotifications}
                    onCheckedChange={(checked) =>
                      setPreferencesForm({ ...preferencesForm, taskAssignmentNotifications: checked })
                    }
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSavePreferences} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscriptions">
          <SubscriptionsContent />
        </TabsContent>
        
        <TabsContent value="team">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Manage team members and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <Button variant="outline">Invite New Member</Button>
                </div>
                
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">JS</div>
                      <div>
                        <p className="font-medium">Jane Smith</p>
                        <p className="text-sm text-muted-foreground">jane@serviceprovider.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">Admin</span>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">MW</div>
                      <div>
                        <p className="font-medium">Michael Wilson</p>
                        <p className="text-sm text-muted-foreground">michael@serviceprovider.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded">Member</span>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">SJ</div>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">sarah@serviceprovider.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded">Member</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles-permissions">
          <RolesPermissionsContent />
        </TabsContent>
        
        <TabsContent value="report-settings">
          <ReportSettingsContent />
        </TabsContent>
        
        <TabsContent value="email-settings">
          <EmailSettingsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
