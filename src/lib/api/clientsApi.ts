
import { Client } from "@/types";
import { apiRequest } from "./apiClient";
import { clients as mockClients } from "./mockData";

// Client API Calls
export const fetchClients = async (): Promise<Client[]> => {
  // Return the mock data directly
  return [...mockClients];
};

export const fetchClient = async (clientId: string): Promise<Client> => {
  // Find client in mock data
  const client = mockClients.find(c => c.id === clientId);
  if (!client) {
    throw new Error(`Client with ID ${clientId} not found`);
  }
  return { ...client };
};

export const createClient = async (clientData: Omit<Client, 'id' | 'createdAt'>): Promise<Client> => {
  // Create a new client with a unique ID
  const newClient: Client = {
    ...clientData,
    id: `client-${Date.now()}`,
    createdAt: new Date()
  };
  
  // In a real app, we would save this to a database
  // Here we just return the new client
  return newClient;
};

export const updateClient = async (clientId: string, clientData: Partial<Client>): Promise<Client> => {
  // Find the client to update
  const client = mockClients.find(c => c.id === clientId);
  if (!client) {
    throw new Error(`Client with ID ${clientId} not found`);
  }
  
  // Update the client
  const updatedClient = { ...client, ...clientData };
  
  // In a real app, we would save this to the database
  // Here we just return the updated client
  return updatedClient;
};

export const deleteClient = async (clientId: string): Promise<void> => {
  // Check if client exists
  const client = mockClients.find(c => c.id === clientId);
  if (!client) {
    throw new Error(`Client with ID ${clientId} not found`);
  }
  
  // In a real app, we would delete from the database
  // Here we just return
  return;
};
