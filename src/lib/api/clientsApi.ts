
import { Client } from "@/types";
import { apiRequest } from "./apiClient";

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
