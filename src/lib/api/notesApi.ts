
import { Note } from "@/types";
import { apiRequest } from "./apiClient";

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
