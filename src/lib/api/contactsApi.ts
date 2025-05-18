
import { Contact } from "@/types";
import { apiRequest } from "./apiClient";

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
