
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { User, UserPlus, Search } from "lucide-react";

// Mockup user data for demonstration
const mockUsers = [
  {
    id: "user-1",
    name: "Demo User",
    email: "demo@example.com",
    role: "service_provider",
    status: "active",
    lastLogin: "2025-05-20T10:30:00Z"
  },
  {
    id: "user-2",
    name: "Admin User",
    email: "admin@consultlink.com",
    role: "service_provider",
    status: "active",
    lastLogin: "2025-05-21T09:15:00Z"
  },
  {
    id: "user-3",
    name: "Client Contact",
    email: "client@example.org",
    role: "client_contact",
    status: "active",
    lastLogin: "2025-05-19T16:45:00Z"
  },
  {
    id: "user-4",
    name: "Inactive User",
    email: "inactive@example.com",
    role: "service_provider",
    status: "inactive",
    lastLogin: "2025-04-15T11:20:00Z"
  }
];

const StaffUsersContent = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(user => roleFilter === "all" || user.role === roleFilter)
    .filter(user => statusFilter === "all" || user.status === statusFilter);

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === "active" ? "inactive" : "active";
        toast({
          title: `User ${newStatus}`,
          description: `${user.name} has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
        });
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
        <div className="flex-1 w-full md:max-w-sm relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="service_provider">Service Provider</SelectItem>
              <SelectItem value="client_contact">Client Contact</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary p-2 rounded-full">
                        <User className="h-4 w-4" />
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "service_provider" ? "default" : "outline"}>
                      {user.role === "service_provider" ? "Staff" : "Client"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "success" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Switch
                        checked={user.status === "active"}
                        onCheckedChange={() => toggleUserStatus(user.id)}
                      />
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StaffUsersContent;
