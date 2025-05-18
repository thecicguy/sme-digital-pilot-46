
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const WhitelabelContent = () => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    companyName: "ConsultLink",
    appName: "ConsultLink",
    logoUrl: "/logo.png",
    primaryColor: "#9b87f5",
    secondaryColor: "#7E69AB",
    footerText: "© 2025 ConsultLink. All rights reserved.",
    favicon: "/favicon.ico",
    customCss: "",
    showPoweredBy: true
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setForm({
      ...form,
      showPoweredBy: checked,
    });
  };
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Whitelabel Settings Saved",
        description: "Your branding changes have been applied successfully.",
      });
    }, 1000);
  };
  
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Whitelabel Settings</h2>
          <p className="text-muted-foreground">Customize the branding and appearance of your application</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>
              Customize your application's name, logo, and colors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  name="companyName" 
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appName">Application Name</Label>
                <Input 
                  id="appName" 
                  name="appName" 
                  value={form.appName}
                  onChange={handleChange}
                  placeholder="Application Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input 
                  id="logoUrl" 
                  name="logoUrl" 
                  value={form.logoUrl}
                  onChange={handleChange}
                  placeholder="/logo.png"
                />
                <p className="text-xs text-muted-foreground">Enter the URL of your company logo</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input 
                  id="favicon" 
                  name="favicon" 
                  value={form.favicon}
                  onChange={handleChange}
                  placeholder="/favicon.ico"
                />
                <p className="text-xs text-muted-foreground">Enter the URL of your favicon</p>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    id="primaryColor"
                    name="primaryColor"
                    value={form.primaryColor}
                    onChange={handleChange}
                    className="h-9 w-9 cursor-pointer rounded border border-input"
                  />
                  <Input 
                    value={form.primaryColor}
                    onChange={handleChange}
                    name="primaryColor"
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    id="secondaryColor"
                    name="secondaryColor"
                    value={form.secondaryColor}
                    onChange={handleChange}
                    className="h-9 w-9 cursor-pointer rounded border border-input"
                  />
                  <Input 
                    value={form.secondaryColor}
                    onChange={handleChange}
                    name="secondaryColor"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Footer & Additional Settings</CardTitle>
            <CardDescription>
              Customize footer text and additional appearance settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="footerText">Footer Text</Label>
              <Input 
                id="footerText" 
                name="footerText" 
                value={form.footerText}
                onChange={handleChange}
                placeholder="© 2025 Your Company. All rights reserved."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customCss">Custom CSS</Label>
              <Textarea 
                id="customCss" 
                name="customCss" 
                value={form.customCss}
                onChange={handleChange}
                placeholder="/* Add your custom CSS here */"
                rows={5}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">Advanced: Add custom CSS to further customize your application</p>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div>
                <Label htmlFor="showPoweredBy">Show "Powered by ConsultLink"</Label>
                <p className="text-sm text-muted-foreground">Display "Powered by ConsultLink" in the footer</p>
              </div>
              <Switch
                id="showPoweredBy"
                checked={form.showPoweredBy}
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default WhitelabelContent;
