
// User Types
export type Role = "service_provider" | "client_contact";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}

// Client Types
export interface Client {
  id: string;
  description: string;
  potentialName?: string;
  location?: string;
  businessName: string;
  createdAt: Date;
}

// Contact Types
export interface Contact {
  id: string;
  name: string;
  email: string;
  mobileNumber?: string;
  role: "business" | "web" | "marketing" | "advisor" | "sme" | "other";
  clientId: string;
  createdAt: Date;
}

// Project Types
export type ProjectType = "consultation" | "implementation" | "training" | "support" | "other";

export interface Project {
  id: string;
  type: ProjectType;
  daysAllocated: number;
  clientId: string;
  createdAt: Date;
}

// Note Types
export type NoteType = "client" | "research" | "onboarding_call" | "email";

export interface Note {
  id: string;
  content: string;
  category: NoteType;
  authorId: string;
  clientId?: string;
  projectId?: string;
  createdAt: Date;
}

// Task Types
export type TaskStatus = "doing" | "done" | "for_review" | "deferred";

export interface Task {
  id: string;
  description: string;
  references?: string;
  assigneeId: string;
  projectId: string;
  dueDate?: Date;
  status: TaskStatus;
  createdAt: Date;
}

// Deliverable Types
export interface Deliverable {
  id: string;
  filePath: string;
  taskId: string;
  uploaderId: string;
  status: TaskStatus;
  createdAt: Date;
}

// Feedback Types
export interface Feedback {
  id: string;
  content: string;
  taskId: string;
  providedAt: Date;
}

// Email Types
export interface Email {
  id: string;
  templateType: "introduction" | "meeting" | "followup";
  recipients: string[];
  content: string;
  sentDate: Date;
}

// Report Types
export interface Report {
  id: string;
  title: string;
  generatedDate: Date;
  content: string;
  projectId: string;
}
