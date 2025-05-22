
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, RotateCw, Shield, Trash2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

const SubscriptionsContent = () => {
  return (
    <div className="space-y-8">
      {/* Application Invoice Section */}
      <Card>
        <CardHeader>
          <CardTitle>Application Invoices</CardTitle>
          <CardDescription>
            Manage and view all invoices related to your application subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">April 2025</p>
                <p className="text-sm text-muted-foreground">Invoice #INV-2025-04</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Download</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">March 2025</p>
                <p className="text-sm text-muted-foreground">Invoice #INV-2025-03</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Download</Button>
          </div>
          
          <div className="text-center mt-4">
            <Button variant="link">View all invoices</Button>
          </div>
        </CardContent>
      </Card>

      {/* Application Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Application Subscription</CardTitle>
          <CardDescription>
            View and manage your annual subscription plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Single subscription plan card with per-user pricing */}
          <div className="border rounded-lg p-6 relative">
            <div className="absolute top-3 right-3">
              <Badge variant="success" className="text-xs">Current Plan</Badge>
            </div>
            
            <h3 className="font-semibold text-xl mb-1">Annual Subscription</h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-3xl font-bold">$19</span>
              <span className="text-muted-foreground mb-1">/month per active team member</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Billed annually in advance ($228/year per active team member)
            </p>
            <p className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-2 rounded-md mb-4">
              $250 one-time setup fee per account
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Full access to all features</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Unlimited Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Advanced analytics & reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Custom branding & integrations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Priority support</span>
              </div>
            </div>
            
            {/* User count section */}
            <div className="border-t pt-4 mb-6">
              <label htmlFor="user-count" className="block text-sm font-medium mb-2">Number of team members</label>
              <div className="flex items-center gap-4">
                <div className="w-32">
                  <Input 
                    id="user-count" 
                    type="number" 
                    min="1" 
                    defaultValue="5" 
                    className="text-center" 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Currently: 5 team members</span>
                </div>
              </div>
            </div>
            
            {/* Estimated total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">Annual Total:</span>
                <span className="font-bold text-xl">$1,140.00</span>
              </div>
              <p className="text-xs text-muted-foreground text-right">5 team members × $228/year</p>
              <p className="text-xs text-amber-600 text-right mt-1">+ $250 one-time setup fee</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button className="w-full">Update Subscription</Button>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground mb-2">Next billing date: June 15, 2025</p>
            <Button variant="link" size="sm">View subscription details</Button>
          </div>
        </CardContent>
      </Card>

      {/* Application Billing Section */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>
            Manage your payment methods and billing details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Methods</h3>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 05/27</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">Edit</Button>
                <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  Default
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline">Add Payment Method</Button>
            </div>
          </div>
          
          <div className="space-y-4 pt-6 border-t">
            <h3 className="text-lg font-medium">Billing Address</h3>
            
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Service Provider Inc.</p>
              <p className="text-sm text-muted-foreground">123 Business Street</p>
              <p className="text-sm text-muted-foreground">San Francisco, CA 94107</p>
              <p className="text-sm text-muted-foreground">United States</p>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">Edit Address</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
          <CardDescription>
            Manage your account data and subscription status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-amber-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-amber-100 rounded-full">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Cancel Subscription</p>
                  <p className="text-sm text-muted-foreground">Pause your subscription temporarily</p>
                </div>
              </div>
              <Button variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-100">
                Cancel
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-red-100 rounded-full">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently remove all your data</p>
                </div>
              </div>
              <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-100">
                Delete
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-green-100 rounded-full">
                  <RotateCw className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Restore Account</p>
                  <p className="text-sm text-muted-foreground">Recover a previously deleted account</p>
                </div>
              </div>
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-100">
                Restore
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GDPR Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Data Protection & GDPR</CardTitle>
          <CardDescription>
            Manage your data privacy settings and requests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Download My Data</p>
                  <p className="text-sm text-muted-foreground">Export all your personal data</p>
                </div>
              </div>
              <Button variant="outline">Request Export</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Right to be Forgotten</p>
                  <p className="text-sm text-muted-foreground">Request deletion of all your data</p>
                </div>
              </div>
              <Button variant="outline">Request Deletion</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Data Processing Agreement</p>
                  <p className="text-sm text-muted-foreground">Review or request a custom DPA</p>
                </div>
              </div>
              <Button variant="outline">View Agreement</Button>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Button variant="link" size="sm">View Privacy Policy</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionsContent;
