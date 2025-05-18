
import { Task, TaskStatus } from "@/types";
import { apiRequest } from "./apiClient";
import { tasks } from "./mockData";

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
  const allTasks = await fetchTasks();
  const taskIndex = allTasks.findIndex(task => task.id === taskId);
  
  if (taskIndex >= 0) {
    allTasks[taskIndex] = { ...allTasks[taskIndex], ...updates };
    
    // Here you would typically send the updated task to your backend API
    // For now, we're just returning the updated task
    return allTasks[taskIndex];
  }
  
  throw new Error(`Task with ID ${taskId} not found`);
};
