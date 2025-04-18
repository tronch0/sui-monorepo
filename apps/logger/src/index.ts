import { Logger } from './logger';

// Create and start the logger
const logger = new Logger();
logger.start();

// Handle termination gracefully
process.on('SIGINT', () => {
  logger.stop();
  process.exit(0);
});
