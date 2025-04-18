"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sui-monorepo/core");
// Log the core package version
(0, core_1.printMessage)(`Using core package version: ${core_1.VERSION}`, 'Logger');
// Counter to track the number of messages
let counter = 0;
// Print a message every second
setInterval(() => {
    counter++;
    (0, core_1.printMessage)(`Message #${counter}`, 'Logger');
}, 1000);
// Handle termination gracefully
process.on('SIGINT', () => {
    (0, core_1.printMessage)('Logger shutting down...', 'Logger');
    process.exit(0);
});
// Initial log
(0, core_1.printMessage)('Logger started!', 'Logger');
