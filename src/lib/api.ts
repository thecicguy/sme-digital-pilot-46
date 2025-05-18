import { Client, Contact, Note, Project, Task } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

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
export const fetchContacts = async (): Promise<Contact[]> => {
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
export const fetchProjects = async (): Promise<Project[]> => {
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
export const fetchNotes = async (): Promise<Note[]> => {
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

export const updateTask = async (taskId: string, updates: { status?: string }) => {
  // Mock implementation - in a real app, this would be an API call
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
