import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
      const response = await axios.get("http://localhost:5000/api/feedback");

      if (response.data.success) {
        setFeedbacks(response.data.data);
      } else {
        throw new Error("Failed to fetch feedbacks");
      }
    } catch (err) {
      setError("Failed to fetch feedbacks. Please try again.");
      console.error("Error fetching feedbacks:", err);
      toast.error("Failed to load feedback entries");
    } finally {
      setLoading(false);
    }
  };

  // Submit new feedback
  const submitFeedback = async (feedbackData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback",
        feedbackData
      );

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
        "Failed to submit feedback. Please try again.";
      setError(errorMessage);
      console.error("Error submitting feedback:", err);
      toast.error(errorMessage);
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
      fetchFeedbacks();
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
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
