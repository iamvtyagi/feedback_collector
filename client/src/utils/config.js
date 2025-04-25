// API configuration
// Hardcoded API base URL for development and production
// This ensures we don't rely on environment variables that might not be loaded correctly
const API_URL = "http://localhost:5000";

// Export the API base URL
export const API_BASE_URL = API_URL;

export const API_ENDPOINTS = {
  SUBMIT_FEEDBACK: "/submit-feedback",
  GET_FEEDBACKS: "/feedbacks",
};

// Log configuration for debugging
console.log("API Configuration:", {
  API_BASE_URL,
  API_ENDPOINTS,
  environment: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
});

// Other configuration variables can be added here
export const APP_NAME = "Feedback Collector";
export const APP_VERSION = "1.0.0";
