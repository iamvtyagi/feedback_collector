// API configuration
// Hardcoded API base URL - directly using the production URL
const API_URL = "https://feedback-collector-pmdf.onrender.com";

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
