import app from './app';
import logger from './config/logger';
import { initializeDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

(async () => {
   await initializeDatabase();  // Ensure database connection
   app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });
  
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1); // Optionally, exit the process on an uncaught exception
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally, exit the process on an unhandled rejection
  });
})();
