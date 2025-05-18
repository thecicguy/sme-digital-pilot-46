
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
import EmailTemplatesContent from "./EmailTemplates";
import ReportTypesContent from "@/components/settings/ReportTypesContent";
import StatusesContent from "@/components/settings/StatusesContent";
import ReportSettingsContent from "@/components/settings/ReportSettingsContent";

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
  
  const [aiSettingsForm, setAiSettingsForm] = useState({
    defaultModel: "gpt-4",
    confidenceThreshold: "medium",
    includeDeliverableContext: true,
    includePreviousReports: true,
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
  
  const handleSaveAiSettings = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "AI Settings Updated",
        description: "Your AI settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="ai-settings">AI Settings</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
          <TabsTrigger value="email-templates">Email Templates</TabsTrigger>
          <TabsTrigger value="report-settings">Report Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
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
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
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
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Interface Preferences</CardTitle>
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
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-settings">
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>
                Configure default AI settings for report generation and analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-model">Default AI Model</Label>
                  <p className="text-sm text-muted-foreground mb-1">
                    This model will be used for reports without a specific model assignment
                  </p>
                  <Select
                    value={aiSettingsForm.defaultModel}
                    onValueChange={(value) =>
                      setAiSettingsForm({ ...aiSettingsForm, defaultModel: value })
                    }
                  >
                    <SelectTrigger id="default-model">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                      <SelectItem value="palm">PaLM</SelectItem>
                      <SelectItem value="llama">Llama</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Note: You can assign specific models to individual report types in the Report Settings tab.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                  <Select
                    value={aiSettingsForm.confidenceThreshold}
                    onValueChange={(value) =>
                      setAiSettingsForm({ ...aiSettingsForm, confidenceThreshold: value })
                    }
                  >
                    <SelectTrigger id="confidence-threshold">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (More suggestions, less accuracy)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="high">High (Fewer suggestions, more accuracy)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Context Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="include-deliverable-context">Include Deliverable Context</Label>
                      <p className="text-sm text-muted-foreground">Include deliverable content in AI analysis</p>
                    </div>
                    <Switch
                      id="include-deliverable-context"
                      checked={aiSettingsForm.includeDeliverableContext}
                      onCheckedChange={(checked) =>
                        setAiSettingsForm({ ...aiSettingsForm, includeDeliverableContext: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="include-previous-reports">Include Previous Reports</Label>
                      <p className="text-sm text-muted-foreground">Reference previous reports in new analyses</p>
                    </div>
                    <Switch
                      id="include-previous-reports"
                      checked={aiSettingsForm.includePreviousReports}
                      onCheckedChange={(checked) =>
                        setAiSettingsForm({ ...aiSettingsForm, includePreviousReports: checked })
                      }
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveAiSettings} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Manage team members and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
        
        <TabsContent value="email-templates">
          <EmailTemplatesContent />
        </TabsContent>
        
        <TabsContent value="report-settings">
          <ReportSettingsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
