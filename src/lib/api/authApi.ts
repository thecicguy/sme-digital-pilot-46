
import { Role, User } from "@/types";

// Auth functions
export const getCurrentUser = async () => {
  // Mock implementation - in a real app, this would check cookies/localStorage
  return {
    id: "user-1",
    name: "Demo User",
    email: "demo@example.com",
    role: "service_provider" as Role,
    createdAt: new Date()
  };
};

export const authenticateUser = async (email: string, password: string) => {
  // Mock implementation - in a real app, this would validate against a backend
  if (email === "demo@example.com" && password === "password") {
    return {
      id: "user-1",
      name: "Demo User",
      email: "demo@example.com",
      role: "service_provider" as Role,
      createdAt: new Date()
    };
  }
  return null;
};
