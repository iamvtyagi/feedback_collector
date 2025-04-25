// API configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export const API_ENDPOINTS = {
  SUBMIT_FEEDBACK: "/submit-feedback",
  GET_FEEDBACKS: "/feedbacks",
};

// Other configuration variables can be added here
export const APP_NAME = "Feedback Collector";
export const APP_VERSION = "1.0.0";
