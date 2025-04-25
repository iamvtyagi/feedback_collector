import { useContext } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import { FeedbackContext } from "../../context/FeedbackContext";

const Header = () => {
  const { showAdmin, toggleAdminView } = useContext(FeedbackContext);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 mb-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              FC
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Feedback Collector
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share your thoughts with us
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleAdminView}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors duration-300"
            >
              {showAdmin ? "Back to Form" : "View Feedback"}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
