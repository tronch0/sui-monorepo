"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
// Create and start the logger
const logger = new logger_1.Logger();
logger.start();
// Handle termination gracefully
process.on('SIGINT', () => {
    logger.stop();
    process.exit(0);
});
