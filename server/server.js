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
    origin: function (origin, callback) {
      // List of allowed origins
      const allowedOrigins = [
        // Local development
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",

        // Deployed frontend URLs
        "https://ffeedbackcollectorr.netlify.app",
        "https://ffeedbackcollectorr.netlify.app/",
      ];

      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) {
        return callback(null, true);
      }

      // For development, allow all origins
      if (process.env.NODE_ENV === "development") {
        return callback(null, true);
      }

      // Check if the origin is allowed
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("CORS blocked request from:", origin);
        // Don't send an error, just don't include the CORS headers
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies
    maxAge: 86400, // Cache preflight request for 1 day
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
