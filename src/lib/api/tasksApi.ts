
import { Task, TaskStatus } from "@/types";
import { apiRequest } from "./apiClient";
import { tasks as mockTasks } from "./mockData";

// Task API Calls
export const fetchTasks = async (): Promise<Task[]> => {
  // Return the mock data directly instead of making an API call
  return [...mockTasks];
};

export const fetchTask = async (taskId: string): Promise<Task> => {
  // Find task in mock data
  const task = mockTasks.find(t => t.id === taskId);
  if (!task) {
    throw new Error(`Task with ID ${taskId} not found`);
  }
  return { ...task };
};

export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  // Create a new task with a unique ID
  const newTask: Task = {
    ...taskData,
    id: `task-${Date.now()}`,
    createdAt: new Date()
  };
  
  // In a real app, we would save this to a database
  // Here we just return the new task
  return newTask;
};

export const updateTask = async (taskId: string, updates: { status?: TaskStatus }) => {
  // Make sure we only accept valid status values
  if (updates.status && !["doing", "done", "for_review", "deferred"].includes(updates.status)) {
    throw new Error(`Invalid task status: ${updates.status}`);
  }
  
  console.log(`Updating task ${taskId} with:`, updates);
  
  // Find the task to update
  const task = mockTasks.find(t => t.id === taskId);
  if (!task) {
    throw new Error(`Task with ID ${taskId} not found`);
  }
  
  // Update the task
  const updatedTask = { ...task, ...updates };
  
  // In a real app, we would save this to the database
  // Here we just return the updated task
  return updatedTask;
};
