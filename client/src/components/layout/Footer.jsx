const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md py-4 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {currentYear} Feedback Collector
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Built by{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Vansh Tyagi
            </span>{" "}
            | MERN Stack Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
