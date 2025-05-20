
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Mail, MessageCircle, CreditCard, CalendarDays, FileText, Brain, Bot, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const IntegrationsContent = () => {
  const [saving, setSaving] = useState(false);
  const [aiSettingsForm, setAiSettingsForm] = useState({
    defaultModel: "gpt-4",
    confidenceThreshold: "medium",
    includeDeliverableContext: true,
    includePreviousReports: true,
  });

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
    <div className="space-y-8">
      {/* AI Configuration */}
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

      {/* AI Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Integrations</CardTitle>
          <CardDescription>
            Connect your AI services and language models
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-purple-100 rounded-full">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">OpenAI</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Claude AI</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-green-100 rounded-full">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Perplexity</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Conference Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Video Conference Integrations</CardTitle>
          <CardDescription>
            Connect your preferred video conferencing tools for seamless meeting scheduling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Zoom</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">GoTo Meeting</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">WebEx</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Microsoft Teams</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Integrations</CardTitle>
          <CardDescription>
            Connect your team communication platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-purple-100 rounded-full">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Slack</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-indigo-100 rounded-full">
                  <MessageCircle className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium">Discord</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounting & CRM Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Accounting & CRM Integrations</CardTitle>
          <CardDescription>
            Connect your accounting and customer relationship management systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-green-100 rounded-full">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">QuickBooks</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Xero</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-red-100 rounded-full">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Zoho</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-amber-100 rounded-full">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Harvest</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-orange-100 rounded-full">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">HubSpot</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-indigo-100 rounded-full">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium">SuiteDash</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-teal-100 rounded-full">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium">KashFlow</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Salesforce</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-pink-100 rounded-full">
                  <MessageCircle className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium">Capsule</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Integrations</CardTitle>
          <CardDescription>
            Connect your payment processors for seamless invoicing and billing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-green-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Stripe</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-green-100 rounded-full">
                  <div className="text-green-600 font-bold text-lg">GC</div>
                </div>
                <div>
                  <p className="font-medium">GoCardless</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar Integrations</CardTitle>
          <CardDescription>
            Connect your calendars for automatic syncing of meetings and deadlines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-red-100 rounded-full">
                  <CalendarDays className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Microsoft Calendar</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsContent;
