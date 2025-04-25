import { useState, useContext, useEffect, useRef } from "react";
import { FeedbackContext } from "../../context/FeedbackContext";
import FeedbackCard from "./FeedbackCard";
import Spinner from "../ui/Spinner";

const FeedbackList = () => {
  const { feedbacks, loading, error, fetchFeedbacks } =
    useContext(FeedbackContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const listRef = useRef(null);

  // Add fade-in animation when component mounts
  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.style.opacity = "0";
      listElement.style.transform = "translateY(20px)";

      setTimeout(() => {
        listElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        listElement.style.opacity = "1";
        listElement.style.transform = "translateY(0)";
      }, 100);
    }
  }, []);

  // Fetch feedbacks if not already loaded
  useEffect(() => {
    if (feedbacks.length === 0 && !loading && !error) {
      fetchFeedbacks();
    }
  }, [feedbacks.length, loading, error, fetchFeedbacks]);

  // Filter feedbacks based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFeedbacks(feedbacks);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = feedbacks.filter(
      (feedback) =>
        feedback.name.toLowerCase().includes(lowerCaseSearch) ||
        feedback.email.toLowerCase().includes(lowerCaseSearch) ||
        feedback.message.toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredFeedbacks(filtered);
  }, [searchTerm, feedbacks]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRefresh = () => {
    // Add rotation animation to refresh button
    const refreshButton = document.querySelector(".refresh-icon");
    if (refreshButton) {
      refreshButton.style.transition = "transform 0.7s ease";
      refreshButton.style.transform = "rotate(360deg)";

      setTimeout(() => {
        refreshButton.style.transition = "none";
        refreshButton.style.transform = "rotate(0deg)";
      }, 700);
    }

    fetchFeedbacks();
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <Spinner size="sm" />
        <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
          Loading feedback submissions...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div className="text-red-600 dark:text-red-400 mb-6 text-lg">
          {error}
        </div>
        <button
          onClick={fetchFeedbacks}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div ref={listRef}>
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
        Feedback Submissions
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Review all the feedback from our users
      </p>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md transition-colors duration-300">
        <div className="relative w-full md:w-auto flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Search by name, email or content..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm("")}
            >
              <svg
                className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {filteredFeedbacks.length}{" "}
            {filteredFeedbacks.length === 1 ? "result" : "results"}
          </span>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Refresh feedbacks"
          >
            <svg
              className="refresh-icon w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {filteredFeedbacks.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
          {searchTerm ? (
            <>
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                No results found for "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                ></path>
              </svg>
              <p className="text-gray-600 dark:text-gray-400">
                No feedback submissions yet.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredFeedbacks.map((feedback, index) => (
            <FeedbackCard
              key={feedback._id}
              feedback={feedback}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
