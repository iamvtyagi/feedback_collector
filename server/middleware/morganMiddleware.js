const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Create a custom token for request body
morgan.token("body", (req) => {
  if (req.method === "POST" || req.method === "PUT") {
    // Don't log sensitive information like passwords
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) sanitizedBody.password = "[REDACTED]";
    if (sanitizedBody.email) sanitizedBody.email = "[REDACTED]";

    return JSON.stringify(sanitizedBody);
  }
  return "";
});

// Create a custom format that includes more information
const devFormat =
  ":method :url :status :response-time ms - :res[content-length] :body";
const prodFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

// Setup the logger
const setupMorganLogger = (app) => {
  const environment = process.env.NODE_ENV || "development";

  if (environment === "development") {
    // In development, log everything to console with colors
    app.use(
      morgan(devFormat, {
        stream: process.stdout,
      })
    );

    // Also log to console directly for debugging
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
  } else {
    // In production, log to a file
    const logDirectory = path.join(__dirname, "../logs");

    // Ensure log directory exists
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    // Create a write stream (append mode)
    const accessLogStream = fs.createWriteStream(
      path.join(logDirectory, "access.log"),
      { flags: "a" }
    );

    // Log all requests to access.log
    app.use(
      morgan(prodFormat, {
        stream: accessLogStream,
      })
    );

    // Also log errors to console
    app.use(
      morgan("dev", {
        skip: (req, res) => res.statusCode < 400,
        stream: process.stderr,
      })
    );
  }
};

module.exports = setupMorganLogger;
