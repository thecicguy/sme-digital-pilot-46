
import { Client, Contact, Note, Project, Task, TaskStatus } from "@/types";

// Mock data for internal use
// These would normally come from an API but are defined here for the notification bell component
export const tasks: Task[] = [
  {
    id: "task-1",
    description: "Complete project proposal",
    references: "Client meeting notes from 05/15",
    assigneeId: "user-1",
    projectId: "project-1",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    status: "doing" as TaskStatus,
    createdAt: new Date()
  },
  {
    id: "task-2",
    description: "Review marketing materials",
    assigneeId: "user-1",
    projectId: "project-2",
    dueDate: new Date(), // Today
    status: "for_review" as TaskStatus,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2))
  }
];

export const projects: Project[] = [
  {
    id: "project-1",
    type: "implementation",
    daysAllocated: 14,
    clientId: "client-1",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10))
  },
  {
    id: "project-2",
    type: "consultation",
    daysAllocated: 7,
    clientId: "client-2",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5))
  }
];

export const clients: Client[] = [
  {
    id: "client-1",
    businessName: "Acme Corporation",
    description: "Leading widget manufacturer",
    location: "New York, NY",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2))
  },
  {
    id: "client-2",
    businessName: "TechStart Inc.",
    description: "Emerging tech startup",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
  }
];

export const contacts: Contact[] = [
  {
    id: "contact-1",
    name: "John Doe",
    email: "john@acme.com",
    role: "business",
    clientId: "client-1",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
  },
  {
    id: "contact-2",
    name: "Jane Smith",
    email: "jane@techstart.com",
    mobileNumber: "+1234567890",
    role: "web",
    clientId: "client-2",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
  }
];
