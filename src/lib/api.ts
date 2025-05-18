
import { Client, Contact, Note, Project, Task, TaskStatus, Role } from "@/types";

// Changed from process.env to import.meta.env for Vite compatibility
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Helper function to handle API requests
const apiRequest = async (url: string, method: string = 'GET', body: any = null) => {
  const headers = {
    'Content-Type': 'application/json',
    // Add any other headers like authorization tokens here
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("API request failed:", error);
    throw error;
  }
};

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

// Auth functions
export const getCurrentUser = async () => {
  // Mock implementation - in a real app, this would check cookies/localStorage
  return {
    id: "user-1",
    name: "Demo User",
    email: "demo@example.com",
    role: "service_provider" as Role,
    createdAt: new Date()
  };
};

export const authenticateUser = async (email: string, password: string) => {
  // Mock implementation - in a real app, this would validate against a backend
  if (email === "demo@example.com" && password === "password") {
    return {
      id: "user-1",
      name: "Demo User",
      email: "demo@example.com",
      role: "service_provider" as Role,
      createdAt: new Date()
    };
  }
  return null;
};

// Client API Calls
export const fetchClients = async (): Promise<Client[]> => {
  return apiRequest('/api/clients');
};

export const fetchClient = async (clientId: string): Promise<Client> => {
  return apiRequest(`/api/clients/${clientId}`);
};

export const createClient = async (clientData: Omit<Client, 'id' | 'createdAt'>): Promise<Client> => {
  return apiRequest('/api/clients', 'POST', clientData);
};

export const updateClient = async (clientId: string, clientData: Partial<Client>): Promise<Client> => {
  return apiRequest(`/api/clients/${clientId}`, 'PUT', clientData);
};

export const deleteClient = async (clientId: string): Promise<void> => {
  return apiRequest(`/api/clients/${clientId}`, 'DELETE');
};

// Contact API Calls
export const fetchContacts = async (clientId?: string): Promise<Contact[]> => {
  if (clientId) {
    return apiRequest(`/api/clients/${clientId}/contacts`);
  }
  return apiRequest('/api/contacts');
};

export const fetchContact = async (contactId: string): Promise<Contact> => {
  return apiRequest(`/api/contacts/${contactId}`);
};

export const createContact = async (contactData: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> => {
  return apiRequest('/api/contacts', 'POST', contactData);
};

export const updateContact = async (contactId: string, contactData: Partial<Contact>): Promise<Contact> => {
  return apiRequest(`/api/contacts/${contactId}`, 'PUT', contactData);
};

export const deleteContact = async (contactId: string): Promise<void> => {
  return apiRequest(`/api/contacts/${contactId}`, 'DELETE');
};

// Project API Calls
export const fetchProjects = async (clientId?: string): Promise<Project[]> => {
  if (clientId) {
    return apiRequest(`/api/clients/${clientId}/projects`);
  }
  return apiRequest('/api/projects');
};

export const fetchProject = async (projectId: string): Promise<Project> => {
  return apiRequest(`/api/projects/${projectId}`);
};

export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
  return apiRequest('/api/projects', 'POST', projectData);
};

export const updateProject = async (projectId: string, projectData: Partial<Project>): Promise<Project> => {
  return apiRequest(`/api/projects/${projectId}`, 'PUT', projectData);
};

export const deleteProject = async (projectId: string): Promise<void> => {
  return apiRequest(`/api/projects/${projectId}`, 'DELETE');
};

// Note API Calls
export const fetchNotes = async (clientId?: string): Promise<Note[]> => {
  if (clientId) {
    return apiRequest(`/api/clients/${clientId}/notes`);
  }
  return apiRequest('/api/notes');
};

export const fetchNote = async (noteId: string): Promise<Note> => {
  return apiRequest(`/api/notes/${noteId}`);
};

export const createNote = async (noteData: Omit<Note, 'id' | 'createdAt'>): Promise<Note> => {
  return apiRequest('/api/notes', 'POST', noteData);
};

export const updateNote = async (noteId: string, noteData: Partial<Note>): Promise<Note> => {
  return apiRequest(`/api/notes/${noteId}`, 'PUT', noteData);
};

export const deleteNote = async (noteId: string): Promise<void> => {
  return apiRequest(`/api/notes/${noteId}`, 'DELETE');
};

// Task API Calls
export const fetchTasks = async (): Promise<Task[]> => {
  return apiRequest('/api/tasks');
};

export const fetchTask = async (taskId: string): Promise<Task> => {
  return apiRequest(`/api/tasks/${taskId}`);
};

export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  return apiRequest('/api/tasks', 'POST', taskData);
};

export const updateTask = async (taskId: string, updates: { status?: TaskStatus }) => {
  // Make sure we only accept valid status values
  if (updates.status && !["doing", "done", "for_review", "deferred"].includes(updates.status)) {
    throw new Error(`Invalid task status: ${updates.status}`);
  }
  
  console.log(`Updating task ${taskId} with:`, updates);
  
  // This is a mock function that simulates a database update
  // In a real app, you would make an API call here
  const tasks = await fetchTasks();
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex >= 0) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    
    // Here you would typically send the updated task to your backend API
    // For now, we're just returning the updated task
    return tasks[taskIndex];
  }
  
  throw new Error(`Task with ID ${taskId} not found`);
};
