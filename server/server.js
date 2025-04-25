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
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
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
