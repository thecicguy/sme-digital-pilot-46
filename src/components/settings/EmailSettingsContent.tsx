
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Project } from "@/types";

const EmailSettingsContent = () => {
  const [saving, setSaving] = useState(false);
  const [projectBccEmails, setProjectBccEmails] = useState<Record<string, string>>({});

  // Modified useQuery to correctly handle the fetchProjects function
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });

  // Form schema for DCC email
  const dccFormSchema = z.object({
    dccEmail: z.string().email({ message: "Please enter a valid email address" }).or(z.literal("")),
    enableDcc: z.boolean().default(false),
  });

  const dccForm = useForm<z.infer<typeof dccFormSchema>>({
    resolver: zodResolver(dccFormSchema),
    defaultValues: {
      dccEmail: "",
      enableDcc: false,
    },
  });

  const handleSaveDccSettings = (values: z.infer<typeof dccFormSchema>) => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "DCC Email Settings Saved",
        description: values.enableDcc 
          ? `DCC email set to ${values.dccEmail}` 
          : "DCC email functionality disabled",
      });
    }, 1000);
  };

  const handleSaveBccEmails = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "BCC Email Settings Saved",
        description: "Project BCC email addresses have been updated successfully.",
      });
    }, 1000);
  };

  const handleBccEmailChange = (projectId: string, email: string) => {
    setProjectBccEmails({
      ...projectBccEmails,
      [projectId]: email,
    });
  };

  return (
    <div className="space-y-6">
      {/* DCC Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle>CRM Email Integration</CardTitle>
          <CardDescription>
            Configure which email address should receive a carbon copy of all client communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...dccForm}>
            <form onSubmit={dccForm.handleSubmit(handleSaveDccSettings)} className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1">
                  <FormField
                    control={dccForm.control}
                    name="enableDcc"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div>
                          <FormLabel>Enable DCC Functionality</FormLabel>
                          <FormDescription>
                            Send a copy of all client emails to the CRM
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={dccForm.control}
                name="dccEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DCC Email Address</FormLabel>
                    <FormDescription>
                      This email will receive a copy of all client communications
                    </FormDescription>
                    <FormControl>
                      <Input 
                        placeholder="crm@yourcompany.com" 
                        {...field} 
                        disabled={!dccForm.watch("enableDcc")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save DCC Settings'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Project BCC Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Project BCC Settings</CardTitle>
          <CardDescription>
            Assign a unique BCC email address for each project to automatically track email communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-4 font-medium text-sm">
                  <div>Project ID</div>
                  <div>BCC Email Address</div>
                </div>
                
                {projects.map((project: Project) => (
                  <div key={project.id} className="grid grid-cols-2 gap-4 items-center">
                    <div className="font-medium">{project.id}</div>
                    <Input
                      type="email"
                      placeholder="project-bcc@yourcompany.com"
                      value={projectBccEmails[project.id] || ""}
                      onChange={(e) => handleBccEmailChange(project.id, e.target.value)}
                    />
                  </div>
                ))}
                
                <div className="flex justify-end mt-6">
                  <Button onClick={handleSaveBccEmails} disabled={saving}>
                    {saving ? 'Saving...' : 'Save BCC Settings'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No projects found. Create projects to assign BCC emails.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Email Templates Link */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Email Templates</h3>
          <p className="text-muted-foreground">Manage your email templates for client communications</p>
        </div>
        <Button variant="outline" onClick={() => window.location.href = '/email-templates'}>
          Manage Email Templates
        </Button>
      </div>
    </div>
  );
};

export default EmailSettingsContent;
