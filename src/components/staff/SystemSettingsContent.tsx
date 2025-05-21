
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Globe, Mail, Shield, Clock, Database, Cloud } from "lucide-react";

const SystemSettingsContent = () => {
  const [settings, setSettings] = useState({
    maintenance: false,
    debugMode: false,
    sessionTimeout: 30,
    maxUploadSize: 10,
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "notifications@consultlink.com",
    systemEmailAddress: "system@consultlink.com",
    supportEmailAddress: "support@consultlink.com",
    customCss: "",
    enableAuditLogs: true,
    autoBackup: true,
    dataRetentionDays: 365,
  });

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveSettings = () => {
    toast({
      title: "Settings updated",
      description: "System settings have been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              General Settings
            </CardTitle>
            <CardDescription>
              Configure system-wide behavior and appearance
            </CardDescription>
          </div>
          <Button onClick={saveSettings}>Save Changes</Button>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance">Maintenance Mode</Label>
                <Switch
                  id="maintenance"
                  checked={settings.maintenance}
                  onCheckedChange={(value) => handleChange("maintenance", value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                When enabled, only administrators can access the system.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="debugMode">Debug Mode</Label>
                <Switch
                  id="debugMode"
                  checked={settings.debugMode}
                  onCheckedChange={(value) => handleChange("debugMode", value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Enable detailed error logging for troubleshooting.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleChange("sessionTimeout", parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
              <Input
                id="maxUploadSize"
                type="number"
                value={settings.maxUploadSize}
                onChange={(e) => handleChange("maxUploadSize", parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Configuration
          </CardTitle>
          <CardDescription>
            Configure system email settings for notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={settings.smtpHost}
                onChange={(e) => handleChange("smtpHost", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                value={settings.smtpPort}
                onChange={(e) => handleChange("smtpPort", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtpUser">SMTP Username</Label>
              <Input
                id="smtpUser"
                value={settings.smtpUser}
                onChange={(e) => handleChange("smtpUser", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtpPass">SMTP Password</Label>
              <Input
                id="smtpPass"
                type="password"
                value="••••••••"
                onChange={(e) => {/* Password handling would go here */}}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="systemEmail">System Email Address</Label>
              <Input
                id="systemEmail"
                value={settings.systemEmailAddress}
                onChange={(e) => handleChange("systemEmailAddress", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email Address</Label>
              <Input
                id="supportEmail"
                value={settings.supportEmailAddress}
                onChange={(e) => handleChange("supportEmailAddress", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Management
          </CardTitle>
          <CardDescription>
            Configure data retention and backup policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auditLogs">Enable Audit Logs</Label>
                <Switch
                  id="auditLogs"
                  checked={settings.enableAuditLogs}
                  onCheckedChange={(value) => handleChange("enableAuditLogs", value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Track user actions for security and compliance purposes.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoBackup">Automatic Backups</Label>
                <Switch
                  id="autoBackup"
                  checked={settings.autoBackup}
                  onCheckedChange={(value) => handleChange("autoBackup", value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Daily backups of all system data.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
            <Input
              id="dataRetention"
              type="number"
              value={settings.dataRetentionDays}
              onChange={(e) => handleChange("dataRetentionDays", parseInt(e.target.value))}
            />
            <p className="text-sm text-muted-foreground">
              How long data is kept before automatic archiving.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security parameters for the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactor">Require 2FA for Staff</Label>
                <Switch
                  id="twoFactor"
                  checked={true}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Require two-factor authentication for all staff users.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="passwordComplexity">Strong Password Policy</Label>
                <Switch
                  id="passwordComplexity"
                  checked={true}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Require complex passwords with minimum length and special characters.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={saveSettings}>Save All Changes</Button>
      </div>
    </div>
  );
};

export default SystemSettingsContent;
