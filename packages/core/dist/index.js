"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = void 0;
exports.printMessage = printMessage;
/**
 * Prints a message to the console
 * @param message The message to print
 * @param prefix Optional prefix to add before the message
 */
function printMessage(message, prefix = 'Core') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${prefix}]: ${message}`);
}
/**
 * Core package version
 */
exports.VERSION = '1.0.0';
