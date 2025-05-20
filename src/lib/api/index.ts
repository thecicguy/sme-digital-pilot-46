
// Main api barrel file that re-exports everything
// This maintains the same public API as before

// Re-export mock data
export { tasks, projects, clients, contacts, timeEntries } from './mockData';

// Re-export auth functions
export { getCurrentUser, authenticateUser } from './authApi';

// Re-export client functions
export { fetchClients, fetchClient, createClient, updateClient, deleteClient } from './clientsApi';

// Re-export contact functions
export { fetchContacts, fetchContact, createContact, updateContact, deleteContact } from './contactsApi';

// Re-export project functions
export { fetchProjects, fetchProject, createProject, updateProject, deleteProject } from './projectsApi';

// Re-export note functions
export { fetchNotes, fetchNote, createNote, updateNote, deleteNote } from './notesApi';

// Re-export task functions
export { fetchTasks, fetchTask, createTask, updateTask } from './tasksApi';

// Re-export time tracking functions
export { 
  fetchTimeEntries, 
  fetchTimeEntry, 
  createTimeEntry, 
  updateTimeEntry, 
  deleteTimeEntry,
  startTimeEntry,
  stopTimeEntry
} from './timeEntriesApi';
