import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);

    try {
      // Using the direct API URL from config with the correct endpoint
      const apiUrl = `${API_BASE_URL}${API_ENDPOINTS.GET_FEEDBACKS}`;
      console.log("Fetching feedbacks from:", apiUrl);

      // Add timeout to prevent hanging requests
      const response = await axios.get(apiUrl, { timeout: 10000 });

      if (response.data.success) {
        setFeedbacks(response.data.data);
      } else {
        throw new Error("Failed to fetch feedbacks");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Failed to fetch feedbacks. Please try again.";
      setError(errorMessage);
      console.error("Error fetching feedbacks:", err);
      console.error("Error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message,
      });
      toast.error(`Failed to load feedback entries: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Submit new feedback
  const submitFeedback = async (feedbackData) => {
    setLoading(true);
    setError(null);

    try {
      // Using the direct API URL from config with the correct endpoint
      const apiUrl = `${API_BASE_URL}${API_ENDPOINTS.SUBMIT_FEEDBACK}`;
      console.log("Submitting feedback to:", apiUrl);
      console.log("Feedback data:", feedbackData);

      // Add timeout to prevent hanging requests
      const response = await axios.post(apiUrl, feedbackData, {
        timeout: 10000,
      });

      if (response.data.success) {
        // If admin view is active, add the new feedback to the list
        if (showAdmin) {
          setFeedbacks((prevFeedbacks) => [
            response.data.data,
            ...prevFeedbacks,
          ]);
        }

        toast.success("Feedback submitted successfully!");
        return { success: true, feedback: response.data.data };
      } else {
        throw new Error(response.data.error || "Failed to submit feedback");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Failed to submit feedback. Please try again.";
      setError(errorMessage);
      console.error("Error submitting feedback:", err);
      console.error("Error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message,
      });
      toast.error(`Failed to submit feedback: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Toggle admin view
  const toggleAdminView = () => {
    setShowAdmin((prev) => !prev);

    // If switching to admin view, fetch feedbacks
    if (!showAdmin) {
      // Test the API connection first
      testApiConnection().then((isConnected) => {
        if (isConnected) {
          fetchFeedbacks();
        } else {
          toast.error(
            "Could not connect to the API. Please check your network connection."
          );
        }
      });
    }
  };

  // Test API connection
  const testApiConnection = async () => {
    try {
      // Try to connect to the API with a simple request
      const apiUrl = API_BASE_URL;
      console.log("Testing API connection to:", apiUrl);

      const response = await axios.get(apiUrl, {
        timeout: 5000,
        validateStatus: () => true, // Accept any status code
      });

      console.log("API connection test result:", {
        status: response.status,
        data: response.data,
      });

      return response.status < 500; // Consider any non-server error as "connected"
    } catch (err) {
      console.error("API connection test failed:", err);
      return false;
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        loading,
        error,
        showAdmin,
        submitFeedback,
        fetchFeedbacks,
        toggleAdminView,
        testApiConnection, // Expose the test function
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
