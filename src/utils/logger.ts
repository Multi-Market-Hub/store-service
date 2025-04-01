import winston from "winston";

const logger = winston.createLogger({
  level: "info", // Log levels: error, warn, info, http, verbose, debug, silly
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Log output in JSON format
  ),
  transports: [
    new winston.transports.Console(), // Logs to the console
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Error logs
    new winston.transports.File({ filename: "logs/combined.log" }), // All logs
  ],
});

// If not in production, also log to the console with a simple format
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
