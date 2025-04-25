import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "./context/ThemeContext";
import { FeedbackProvider } from "./context/FeedbackContext";
import { FeedbackContext } from "./context/FeedbackContext";
import Layout from "./components/layout/Layout";
import FeedbackForm from "./components/feedback/FeedbackForm";
import FeedbackList from "./components/feedback/FeedbackList";

const App = () => {
  return (
    <ThemeProvider>
      <FeedbackProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Layout>
          <AppContent />
        </Layout>
      </FeedbackProvider>
    </ThemeProvider>
  );
};

// Separate component to access context after it's provided
const AppContent = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <FeedbackRouter />
    </div>
  );
};

// Router component to conditionally render form or list
const FeedbackRouter = () => {
  const { showAdmin } = useContext(FeedbackContext);

  // Update document title based on current view
  useEffect(() => {
    document.title = showAdmin
      ? "Admin View | Feedback Collector"
      : "Submit Feedback | Feedback Collector";
  }, [showAdmin]);

  return <>{showAdmin ? <FeedbackList /> : <FeedbackForm />}</>;
};

export default App;
