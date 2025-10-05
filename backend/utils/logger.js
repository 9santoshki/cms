const winston = require('winston');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
require('fs').mkdirSync(logsDir, { recursive: true });

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

// Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Define transports
const transports = [
  // Write all logs with level `error` and below to `error.log`
  new winston.transports.File({ 
    filename: path.join(logsDir, 'error.log'), 
    level: 'error',
    format
  }),
  
  // Write all logs with level `info` and below to `combined.log`
  new winston.transports.File({ 
    filename: path.join(logsDir, 'combined.log'),
    format
  }),
];

// If we're not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

// Create the logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format,
  transports,
  defaultMeta: { service: 'ecommerce-backend' }
});

module.exports = logger;