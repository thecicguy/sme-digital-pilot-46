
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

// Import the content components
import ReportTypesContent from "@/components/settings/ReportTypesContent";
import StatusesContent from "@/components/settings/StatusesContent";
import ReportSettingsContent from "@/components/settings/ReportSettingsContent";
import WhitelabelContent from "@/components/settings/WhitelabelContent";
import IntegrationsContent from "@/components/settings/IntegrationsContent";
import SubscriptionsContent from "@/components/settings/SubscriptionsContent";
import RolesPermissionsContent from "@/components/settings/RolesPermissionsContent";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  
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
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile & Preferences</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
          <TabsTrigger value="report-settings">Configuration</TabsTrigger>
          <TabsTrigger value="whitelabel" disabled className="opacity-50 cursor-not-allowed" title="Available on Pro Plan">Whitelabel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={profileForm.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
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
                  {saving ? 'Saving...' : 'Save Profile'}
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
                  <Label htmlFor="reminder-notifications">Reminders</Label>
                  <div>
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
          
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <IntegrationsContent />
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
          
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>
                Configure user roles and their access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RolesPermissionsContent />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="report-settings">
          <ReportSettingsContent />
        </TabsContent>
        
        <TabsContent value="whitelabel">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Whitelabel Settings</CardTitle>
              <CardDescription>
                Customize the branding and appearance of your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-dashed flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M19 11V9a1 1 0 0 0-1-1h-10"/><path d="M7 21h10a1 1 0 0 0 1-1v-2"/><path d="m9 5 4-4 4 4"/><path d="m9 19-4 4-4-4"/></svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">Upgrade to Pro Plan</h3>
                <p className="text-muted-foreground max-w-md">
                  Whitelabel features are available exclusively on our Pro Plan. Upgrade now to remove branding and customize the application to match your company identity.
                </p>
                <Button className="mt-6">Upgrade to Pro</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
