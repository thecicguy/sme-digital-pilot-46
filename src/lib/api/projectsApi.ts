
import { Project } from "@/types";
import { apiRequest } from "./apiClient";

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
