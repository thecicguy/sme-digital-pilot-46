
import { TimeEntry } from "@/types";
import { timeEntries as mockTimeEntries } from "./mockData";

// Time Entry API Calls
export const fetchTimeEntries = async (): Promise<TimeEntry[]> => {
  // Return the mock data directly
  return [...mockTimeEntries];
};

export const fetchTimeEntry = async (timeEntryId: string): Promise<TimeEntry> => {
  // Find time entry in mock data
  const timeEntry = mockTimeEntries.find(t => t.id === timeEntryId);
  if (!timeEntry) {
    throw new Error(`Time entry with ID ${timeEntryId} not found`);
  }
  return { ...timeEntry };
};

export const createTimeEntry = async (timeEntryData: Omit<TimeEntry, 'id' | 'createdAt'>): Promise<TimeEntry> => {
  // Create a new time entry with a unique ID
  const newTimeEntry: TimeEntry = {
    ...timeEntryData,
    id: `time-${Date.now()}`,
    createdAt: new Date()
  };
  
  // In a real app, we would save this to a database
  // Here we just return the new time entry
  return newTimeEntry;
};

export const updateTimeEntry = async (
  timeEntryId: string, 
  updates: Partial<Omit<TimeEntry, 'id' | 'createdAt'>>
): Promise<TimeEntry> => {
  // Find the time entry to update
  const timeEntry = mockTimeEntries.find(t => t.id === timeEntryId);
  if (!timeEntry) {
    throw new Error(`Time entry with ID ${timeEntryId} not found`);
  }
  
  // Update the time entry
  const updatedTimeEntry = { ...timeEntry, ...updates };
  
  // In a real app, we would save this to the database
  // Here we just return the updated time entry
  return updatedTimeEntry;
};

export const deleteTimeEntry = async (timeEntryId: string): Promise<void> => {
  // Check if time entry exists
  const timeEntry = mockTimeEntries.find(t => t.id === timeEntryId);
  if (!timeEntry) {
    throw new Error(`Time entry with ID ${timeEntryId} not found`);
  }
  
  // In a real app, we would delete from the database
  // Here we just return
  return;
};

export const startTimeEntry = async (timeEntryData: Omit<TimeEntry, 'id' | 'createdAt' | 'duration' | 'endTime'>): Promise<TimeEntry> => {
  const newTimeEntry: TimeEntry = {
    ...timeEntryData,
    id: `time-${Date.now()}`,
    duration: 0, // Will be calculated when stopped
    isRunning: true,
    createdAt: new Date()
  };
  
  return newTimeEntry;
};

export const stopTimeEntry = async (timeEntryId: string): Promise<TimeEntry> => {
  // Find the time entry to stop
  const timeEntry = mockTimeEntries.find(t => t.id === timeEntryId);
  if (!timeEntry) {
    throw new Error(`Time entry with ID ${timeEntryId} not found`);
  }
  
  if (!timeEntry.isRunning) {
    throw new Error(`Time entry with ID ${timeEntryId} is not running`);
  }
  
  const endTime = new Date();
  const durationMs = endTime.getTime() - new Date(timeEntry.startTime).getTime();
  const durationMinutes = Math.round(durationMs / (1000 * 60));
  
  const updatedTimeEntry = { 
    ...timeEntry, 
    endTime, 
    duration: durationMinutes, 
    isRunning: false 
  };
  
  // In a real app, we would save this to the database
  // Here we just return the updated time entry
  return updatedTimeEntry;
};
