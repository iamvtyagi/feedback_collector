import { useState, useContext, useRef, useEffect } from "react";
import { FeedbackContext } from "../../context/FeedbackContext";
import Spinner from "../ui/Spinner";
import { toast } from "react-toastify";
import { API_BASE_URL, API_ENDPOINTS } from "../../utils/config";

const FeedbackForm = () => {
  const { submitFeedback, testApiConnection } = useContext(FeedbackContext);
  const [testingConnection, setTestingConnection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  // Add animation when component mounts
  useEffect(() => {
    const formElement = formRef.current;
    formElement.style.opacity = "0";
    formElement.style.transform = "translateY(20px)";

    setTimeout(() => {
      formElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      formElement.style.opacity = "1";
      formElement.style.transform = "translateY(0)";
    }, 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, message } = formData;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = "Feedback message is required";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);

    // If there are errors, add a shake animation to the form
    if (Object.keys(newErrors).length > 0) {
      const form = formRef.current;
      form.style.animation = "shake 0.5s";
      setTimeout(() => {
        form.style.animation = "";
      }, 500);
    }

    return Object.keys(newErrors).length === 0;
  };

  // Test API connection
  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      const isConnected = await testApiConnection();
      if (isConnected) {
        toast.success("Successfully connected to the API!");
      } else {
        toast.error(
          "Could not connect to the API. Please check your network connection."
        );
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      toast.error("Error testing connection. Please try again.");
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await submitFeedback(formData);

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        // Reset the submitted state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="section-title text-3xl font-bold text-center mb-2">
        Share Your Feedback
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        We value your opinion and would love to hear from you!
      </p>

      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300"
        ref={formRef}
      >
        {isSubmitted ? (
          <div className="text-center py-10 px-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
              Thank You!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Your feedback has been submitted successfully. We appreciate your
              time and will use your input to improve our services.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
            >
              Submit Another Feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                className={`w-full p-3 border rounded-lg transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  focusedField === "name"
                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                    : "border-gray-300 dark:border-gray-600"
                } ${errors.name ? "border-red-500 dark:border-red-500" : ""}`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className={`w-full p-3 border rounded-lg transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  focusedField === "email"
                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                    : "border-gray-300 dark:border-gray-600"
                } ${errors.email ? "border-red-500 dark:border-red-500" : ""}`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Feedback Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                rows="4"
                className={`w-full p-3 border rounded-lg transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  focusedField === "message"
                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                    : "border-gray-300 dark:border-gray-600"
                } ${
                  errors.message ? "border-red-500 dark:border-red-500" : ""
                }`}
                placeholder="Please share your thoughts with us..."
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                disabled={loading || testingConnection}
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" color="white" />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>

              <button
                type="button"
                onClick={handleTestConnection}
                disabled={loading || testingConnection}
                className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md font-medium transition-colors duration-300 text-sm"
              >
                {testingConnection ? (
                  <>
                    <Spinner size="sm" color="gray" />
                    <span className="ml-2">Testing Connection...</span>
                  </>
                ) : (
                  "Test API Connection"
                )}
              </button>

              {/* Debug information */}
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-500 dark:text-gray-400">
                <p>API URL: {API_BASE_URL || "Not set"}</p>
                <p>Submit Endpoint: {API_ENDPOINTS.SUBMIT_FEEDBACK}</p>
                <p>
                  Full URL:{" "}
                  {`${API_BASE_URL || ""}${API_ENDPOINTS.SUBMIT_FEEDBACK}`}
                </p>
                <p>Environment: {import.meta.env.MODE}</p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
