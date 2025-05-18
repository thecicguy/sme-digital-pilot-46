
// Base API client for handling API requests

// Changed from process.env to import.meta.env for Vite compatibility
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const USE_MOCK_DATA = true; // Toggle this to true to use mock data instead of making API requests

// Helper function to handle API requests
export const apiRequest = async (url: string, method: string = 'GET', body: any = null) => {
  // If we're using mock data, this function doesn't actually make API requests
  // The actual mock data handling is done in the individual API files
  // This is just kept to maintain the same interface
  
  if (USE_MOCK_DATA) {
    console.log(`Mock API call: ${method} ${url}`, body);
    // The actual implementation is in the specific API files
    // This just maintains the interface
    return Promise.resolve({});
  }

  const headers = {
    'Content-Type': 'application/json',
    // Add any other headers like authorization tokens here
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("API request failed:", error);
    throw error;
  }
};
