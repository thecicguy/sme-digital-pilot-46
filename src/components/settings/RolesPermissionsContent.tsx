
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Shield, Settings, Key } from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault: boolean;
}

const RolesPermissionsContent = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrator",
      description: "Full access to all features",
      permissions: ["all"],
      isDefault: false
    },
    {
      id: "manager",
      name: "Consultant",
      description: "Can manage projects and reports",
      permissions: ["reports:view", "reports:edit", "clients:view", "clients:edit", "projects:view", "projects:edit", "tasks:view", "tasks:edit"],
      isDefault: false
    },
    {
      id: "member",
      name: "Team Member",
      description: "Can work on assigned tasks and projects",
      permissions: ["reports:view", "clients:view", "projects:view", "tasks:view", "tasks:edit"],
      isDefault: true
    },
    {
      id: "client",
      name: "Client",
      description: "Can view reports and documents shared with them",
      permissions: ["reports:view", "docs:view"],
      isDefault: false
    }
  ]);
  
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: "reports:view", name: "View Reports", description: "Can view reports", category: "Reports" },
    { id: "reports:edit", name: "Edit Reports", description: "Can create and edit reports", category: "Reports" },
    { id: "reports:delete", name: "Delete Reports", description: "Can delete reports", category: "Reports" },
    { id: "clients:view", name: "View Clients", description: "Can view client details", category: "Clients" },
    { id: "clients:edit", name: "Edit Clients", description: "Can create and edit clients", category: "Clients" },
    { id: "clients:delete", name: "Delete Clients", description: "Can delete clients", category: "Clients" },
    { id: "projects:view", name: "View Projects", description: "Can view project details", category: "Projects" },
    { id: "projects:edit", name: "Edit Projects", description: "Can create and edit projects", category: "Projects" },
    { id: "projects:delete", name: "Delete Projects", description: "Can delete projects", category: "Projects" },
    { id: "tasks:view", name: "View Tasks", description: "Can view tasks", category: "Tasks" },
    { id: "tasks:edit", name: "Edit Tasks", description: "Can create and edit tasks", category: "Tasks" },
    { id: "tasks:delete", name: "Delete Tasks", description: "Can delete tasks", category: "Tasks" },
    { id: "docs:view", name: "View Documents", description: "Can view documents", category: "Documents" },
    { id: "docs:edit", name: "Edit Documents", description: "Can create and edit documents", category: "Documents" },
    { id: "docs:delete", name: "Delete Documents", description: "Can delete documents", category: "Documents" },
    { id: "settings:view", name: "View Settings", description: "Can view settings", category: "Settings" },
    { id: "settings:edit", name: "Edit Settings", description: "Can edit settings", category: "Settings" },
    { id: "all", name: "Full Access", description: "Has access to everything", category: "System" },
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0]);
  const [editMode, setEditMode] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");

  const permissionCategories = [...new Set(permissions.map(p => p.category))];

  const handlePermissionToggle = (permissionId: string) => {
    if (!selectedRole) return;
    
    const updatedPermissions = selectedRole.permissions.includes(permissionId)
      ? selectedRole.permissions.filter(id => id !== permissionId)
      : [...selectedRole.permissions, permissionId];
    
    // Special handling for "all" permission
    if (permissionId === "all" && updatedPermissions.includes("all")) {
      // If "all" was just added, remove all other permissions as they're redundant
      const updatedRole = { ...selectedRole, permissions: ["all"] };
      setSelectedRole(updatedRole);
      setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
    } else if (permissionId === "all" && !updatedPermissions.includes("all")) {
      // If "all" was just removed, add all individual permissions
      const allPermissionIds = permissions
        .filter(p => p.id !== "all")
        .map(p => p.id);
      const updatedRole = { ...selectedRole, permissions: allPermissionIds };
      setSelectedRole(updatedRole);
      setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
    } else {
      // If any other permission is toggled while "all" is selected, remove "all"
      const cleanedPermissions = updatedPermissions.filter(p => p !== "all");
      const updatedRole = { ...selectedRole, permissions: cleanedPermissions };
      setSelectedRole(updatedRole);
      setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
    }
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setEditMode(false);
    setNewRoleName(role.name);
    setNewRoleDescription(role.description);
  };

  const handleSaveRole = () => {
    if (!selectedRole) return;
    
    const updatedRole = {
      ...selectedRole,
      name: newRoleName || selectedRole.name,
      description: newRoleDescription || selectedRole.description
    };
    
    setRoles(roles.map(r => r.id === selectedRole.id ? updatedRole : r));
    setSelectedRole(updatedRole);
    setEditMode(false);
    
    toast({
      title: "Role Updated",
      description: `${updatedRole.name} role has been updated successfully.`,
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-4 space-y-4">
        <div className="font-medium flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5" />
          <span>User Roles</span>
        </div>
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`p-3 rounded-md cursor-pointer border ${
                selectedRole?.id === role.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
              onClick={() => handleRoleSelect(role)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{role.name}</h4>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                {role.isDefault && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Default</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Remove the "Add New Role" button */}
      </div>
      
      <div className="md:col-span-8">
        {selectedRole && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  {editMode ? (
                    <Input
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="font-semibold h-9"
                    />
                  ) : (
                    <span>{selectedRole.name}</span>
                  )}
                </CardTitle>
                <div className="flex gap-2">
                  {editMode ? (
                    <Button onClick={handleSaveRole} size="sm">Save Changes</Button>
                  ) : (
                    <Button onClick={() => setEditMode(true)} variant="outline" size="sm">Edit Role</Button>
                  )}
                </div>
              </div>
              {editMode ? (
                <Input
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  className="text-sm text-muted-foreground"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{selectedRole.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    <span>Permissions</span>
                  </h3>
                  {/* Removed the "Set as Default" and "Delete Role" buttons */}
                </div>
                
                <div className="space-y-6">
                  {permissionCategories.map((category) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium">{category}</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">Grant</TableHead>
                            <TableHead>Permission</TableHead>
                            <TableHead className="hidden md:table-cell">Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {permissions
                            .filter(p => p.category === category)
                            .map((permission) => {
                              // If "all" is selected, all permissions should appear checked
                              const isChecked = selectedRole.permissions.includes("all") || 
                                selectedRole.permissions.includes(permission.id);
                              
                              return (
                                <TableRow key={permission.id}>
                                  <TableCell>
                                    <Checkbox 
                                      checked={isChecked}
                                      onCheckedChange={() => handlePermissionToggle(permission.id)}
                                      disabled={selectedRole.permissions.includes("all") && permission.id !== "all"}
                                    />
                                  </TableCell>
                                  <TableCell className="font-medium">{permission.name}</TableCell>
                                  <TableCell className="hidden md:table-cell">{permission.description}</TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RolesPermissionsContent;
