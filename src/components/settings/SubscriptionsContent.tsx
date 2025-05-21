
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, RotateCw, Shield, Trash2 } from "lucide-react";

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
            View and manage your current subscription plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4 relative">
              <div className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                Current Plan
              </div>
              <h3 className="font-semibold text-lg mb-2">Professional</h3>
              <p className="text-2xl font-bold mb-4">$49<span className="text-sm text-muted-foreground">/month</span></p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Up to 10 team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Advanced reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Custom branding</span>
                </li>
              </ul>
              <Button className="w-full" disabled>Current Plan</Button>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Business</h3>
              <p className="text-2xl font-bold mb-4">$99<span className="text-sm text-muted-foreground">/month</span></p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Priority support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Upgrade</Button>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Enterprise</h3>
              <p className="text-2xl font-bold mb-4">$249<span className="text-sm text-muted-foreground">/month</span></p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Unlimited everything</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Custom development</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
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
