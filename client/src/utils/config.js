// API configuration
// Determine the API URL based on the current environment
const getApiUrl = () => {
  // Check if we're in development or production
  const isProduction = import.meta.env.PROD;

  if (isProduction) {
    // In production, use your deployed API URL
    return "https://feedback-collector-backend.onrender.com"; // Replace with your actual backend URL
  } else {
    // In development, use localhost
    return "http://localhost:5000";
  }
};

// Export the API base URL
export const API_BASE_URL = getApiUrl();

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
