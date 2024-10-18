import { createLogger, format, transports } from 'winston';

// Define custom log formats
const { combine, timestamp, printf, colorize, errors } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] : ${stack || message}`;
});

// Create a Winston logger instance
const logger = createLogger({
  level: 'info', 
  format: combine(
    errors({ stack: true }), 
    timestamp(),             
    colorize(),              
    logFormat              
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }) 
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' }) 
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'logs/rejections.log' }) // Handle unhandled promise rejections
  ]
});

export default logger;
