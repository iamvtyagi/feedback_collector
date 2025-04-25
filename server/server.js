const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const setupMorganLogger = require("./middleware/morganMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
// Add specific CORS handling middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://feedback-collector-inky.vercel.app",
    "https://feedbackcollecteri.netlify.app",
  ];

  const origin = req.headers.origin;

  // Check if the origin is in our allowed list
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    // For requests without origin (like Postman)
    res.header("Access-Control-Allow-Origin", "*");
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});
app.use(express.json());

// Set up Morgan logger with custom configuration
setupMorganLogger(app);

// Simple middleware to log all requests
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Welcome route
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to the Feedback Collector API",
    endpoints: {
      submitFeedback: "POST /submit-feedback",
      getAllFeedback: "GET /feedbacks",
    },
  });
});

// Routes
app.post("/submit-feedback", require("./routes/feedbackRoutes").submitFeedback);
app.get("/feedbacks", require("./routes/feedbackRoutes").getAllFeedbacks);

// Error handling middleware
app.use(errorHandler);

// Handle 404 - Route not found
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
1