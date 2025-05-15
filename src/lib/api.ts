
import { Client, Contact, Project, Task, Note, User, Deliverable, Feedback, Email, Report } from "@/types";
import { toast } from "@/hooks/use-toast";

// Mock data - in a real application, these would be API calls to your backend
const MOCK_DELAY = 500; // ms delay to simulate API call

// Mock Users
export const users: User[] = [
  {
    id: "user1",
    name: "Jane Smith",
    email: "jane@serviceprovider.com",
    role: "service_provider",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "user2",
    name: "John Doe",
    email: "john@client.com",
    role: "client_contact",
    createdAt: new Date("2023-02-20"),
  },
];

// Mock Clients
export const clients: Client[] = [
  {
    id: "client1",
    description: "Small retail business looking to digitize inventory management",
    potentialName: "RetailTech Solutions",
    location: "New York, NY",
    businessName: "City Boutique",
    createdAt: new Date("2023-03-01"),
  },
  {
    id: "client2",
    description: "Restaurant chain seeking online ordering and reservation system",
    businessName: "Gourmet Group",
    location: "Chicago, IL",
    createdAt: new Date("2023-02-15"),
  },
  {
    id: "client3",
    description: "Professional services firm needing CRM implementation",
    businessName: "Apex Consulting",
    location: "San Francisco, CA",
    createdAt: new Date("2023-04-10"),
  },
];

// Mock Contacts
export const contacts: Contact[] = [
  {
    id: "contact1",
    name: "Emma Johnson",
    email: "emma@cityboutique.com",
    mobileNumber: "212-555-1234",
    role: "business",
    clientId: "client1",
    createdAt: new Date("2023-03-02"),
  },
  {
    id: "contact2",
    name: "Michael Chen",
    email: "michael@cityboutique.com",
    mobileNumber: "212-555-5678",
    role: "web",
    clientId: "client1",
    createdAt: new Date("2023-03-05"),
  },
  {
    id: "contact3",
    name: "Sarah Williams",
    email: "sarah@gourmetgroup.com",
    mobileNumber: "312-555-8765",
    role: "business",
    clientId: "client2",
    createdAt: new Date("2023-02-16"),
  },
  {
    id: "contact4",
    name: "David Kim",
    email: "david@apexconsulting.com",
    mobileNumber: "415-555-9876",
    role: "business",
    clientId: "client3",
    createdAt: new Date("2023-04-11"),
  },
];

// Mock Projects
export const projects: Project[] = [
  {
    id: "project1",
    type: "implementation",
    daysAllocated: 14,
    clientId: "client1",
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "project2",
    type: "consultation",
    daysAllocated: 5,
    clientId: "client2",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "project3",
    type: "training",
    daysAllocated: 3,
    clientId: "client3",
    createdAt: new Date("2023-04-15"),
  },
];

// Mock Tasks
export const tasks: Task[] = [
  {
    id: "task1",
    description: "Complete inventory audit",
    references: "See attached spreadsheet template",
    assigneeId: "contact1",
    projectId: "project1",
    dueDate: new Date("2023-03-20"),
    status: "doing",
    createdAt: new Date("2023-03-11"),
  },
  {
    id: "task2",
    description: "Provide current website access",
    assigneeId: "contact2",
    projectId: "project1",
    dueDate: new Date("2023-03-15"),
    status: "done",
    createdAt: new Date("2023-03-11"),
  },
  {
    id: "task3",
    description: "Complete business requirements questionnaire",
    assigneeId: "contact3",
    projectId: "project2",
    dueDate: new Date("2023-02-25"),
    status: "for_review",
    createdAt: new Date("2023-02-21"),
  },
];

// Mock Notes
export const notes: Note[] = [
  {
    id: "note1",
    content: "Client expressed interest in mobile inventory scanning",
    category: "client",
    authorId: "user1",
    clientId: "client1",
    projectId: "project1",
    createdAt: new Date("2023-03-12"),
  },
  {
    id: "note2",
    content: "Current website built on WordPress, last updated 2021",
    category: "research",
    authorId: "user1",
    clientId: "client1",
    createdAt: new Date("2023-03-06"),
  },
];

// API simulation functions
export async function fetchClients(): Promise<Client[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return [...clients];
}

export async function fetchClient(id: string): Promise<Client | undefined> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return clients.find(client => client.id === id);
}

export async function createClient(client: Omit<Client, 'id' | 'createdAt'>): Promise<Client> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const newClient = {
    ...client,
    id: `client${clients.length + 1}`,
    createdAt: new Date()
  };
  clients.push(newClient);
  toast({
    title: "Client Created",
    description: `${newClient.businessName} has been added successfully.`
  });
  return newClient;
}

export async function fetchContacts(clientId?: string): Promise<Contact[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return clientId 
    ? contacts.filter(contact => contact.clientId === clientId)
    : [...contacts];
}

export async function fetchContact(id: string): Promise<Contact | undefined> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return contacts.find(contact => contact.id === id);
}

export async function createContact(contact: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const newContact = {
    ...contact,
    id: `contact${contacts.length + 1}`,
    createdAt: new Date()
  };
  contacts.push(newContact);
  toast({
    title: "Contact Created",
    description: `${newContact.name} has been added successfully.`
  });
  return newContact;
}

export async function fetchProjects(clientId?: string): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return clientId
    ? projects.filter(project => project.clientId === clientId)
    : [...projects];
}

export async function fetchProject(id: string): Promise<Project | undefined> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return projects.find(project => project.id === id);
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const newProject = {
    ...project,
    id: `project${projects.length + 1}`,
    createdAt: new Date()
  };
  projects.push(newProject);
  toast({
    title: "Project Created",
    description: `A new project has been created successfully.`
  });
  return newProject;
}

export async function fetchTasks(projectId?: string): Promise<Task[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return projectId
    ? tasks.filter(task => task.projectId === projectId)
    : [...tasks];
}

export async function fetchTask(id: string): Promise<Task | undefined> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return tasks.find(task => task.id === id);
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const newTask = {
    ...task,
    id: `task${tasks.length + 1}`,
    createdAt: new Date()
  };
  tasks.push(newTask);
  toast({
    title: "Task Created",
    description: `A new task has been created successfully.`
  });
  return newTask;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) throw new Error("Task not found");
  
  const updatedTask = { ...tasks[index], ...updates };
  tasks[index] = updatedTask;
  
  toast({
    title: "Task Updated",
    description: `Task has been updated successfully.`
  });
  return updatedTask;
}

export async function fetchNotes(clientId?: string, projectId?: string): Promise<Note[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  let filteredNotes = [...notes];
  
  if (clientId) {
    filteredNotes = filteredNotes.filter(note => note.clientId === clientId);
  }
  
  if (projectId) {
    filteredNotes = filteredNotes.filter(note => note.projectId === projectId);
  }
  
  return filteredNotes;
}

export async function createNote(note: Omit<Note, 'id' | 'createdAt'>): Promise<Note> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const newNote = {
    ...note,
    id: `note${notes.length + 1}`,
    createdAt: new Date()
  };
  notes.push(newNote);
  toast({
    title: "Note Created",
    description: `A new note has been added successfully.`
  });
  return newNote;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  // This is just a mock - in a real app, you'd validate credentials properly
  const user = users.find(u => u.email === email);
  return user || null;
}

export async function getCurrentUser(): Promise<User | null> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  // In a real app, this would check the authentication token
  return users[0]; // Default to first user for demo
}
