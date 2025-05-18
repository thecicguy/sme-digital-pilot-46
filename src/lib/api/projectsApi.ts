import { Project } from "@/types";
import { apiRequest } from "./apiClient";
import { projects as mockProjects, clients as mockClients } from "./mockData";

// Project API Calls
export const fetchProjects = async (clientId?: string): Promise<Project[]> => {
  // If a client ID is provided, filter projects by that client
  if (clientId) {
    return [...mockProjects.filter(project => project.clientId === clientId)];
  }
  // Otherwise return all projects
  return [...mockProjects];
};

export const fetchProject = async (projectId: string): Promise<Project> => {
  // Find project in mock data
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) {
    throw new Error(`Project with ID ${projectId} not found`);
  }
  return { ...project };
};

export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
  // Create a new project with a unique ID
  const newProject: Project = {
    ...projectData,
    id: `project-${Date.now()}`,
    createdAt: new Date()
  };
  
  // In a real app, we would save this to a database
  // Here we just return the new project
  return newProject;
};

export const updateProject = async (projectId: string, projectData: Partial<Project>): Promise<Project> => {
  // Find the project to update
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) {
    throw new Error(`Project with ID ${projectId} not found`);
  }
  
  // Update the project
  const updatedProject = { ...project, ...projectData };
  
  // In a real app, we would save this to the database
  // Here we just return the updated project
  return updatedProject;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  // Check if project exists
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) {
    throw new Error(`Project with ID ${projectId} not found`);
  }
  
  // In a real app, we would delete from the database
  // Here we just return
  return;
};
