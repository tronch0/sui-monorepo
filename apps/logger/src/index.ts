import { printMessage, VERSION } from '@sui-monorepo/core';

// Log the core package version
printMessage(`Using core package version: ${VERSION}`, 'Logger');

// Counter to track the number of messages
let counter = 0;

// Print a message every second
setInterval(() => {
  counter++;
  printMessage(`Message #${counter}`, 'Logger');
}, 1000);

// Handle termination gracefully
process.on('SIGINT', () => {
  printMessage('Logger shutting down...', 'Logger');
  process.exit(0);
});

// Initial log
printMessage('Logger started!', 'Logger'); 