import { useRef, useEffect } from "react";

const FeedbackCard = ({ feedback, index }) => {
  const cardRef = useRef(null);

  // Add fade-in animation with staggered delay
  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.style.opacity = "0";
      cardElement.style.transform = "translateY(20px)";

      setTimeout(() => {
        cardElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        cardElement.style.opacity = "1";
        cardElement.style.transform = "translateY(0)";
      }, 100 + index * 100); // Staggered delay based on index
    }
  }, [index]);

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time ago
  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? "1 year ago" : `${interval} years ago`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? "1 month ago" : `${interval} months ago`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? "1 day ago" : `${interval} days ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
    }

    return seconds < 10 ? "just now" : `${Math.floor(seconds)} seconds ago`;
  };

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3 shadow-md">
            {feedback.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">
              {feedback.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {feedback.email}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 dark:text-gray-500 block">
            {timeAgo(feedback.createdAt)}
          </span>
          <span
            className="text-xs text-gray-400 dark:text-gray-600 block mt-1"
            title={formatDate(feedback.createdAt)}
          >
            {formatDate(feedback.createdAt)}
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
        <p className="text-gray-700 dark:text-gray-300 pl-4">
          {feedback.message}
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard;
