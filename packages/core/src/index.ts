/**
 * Prints a message to the console
 * @param message The message to print
 * @param prefix Optional prefix to add before the message
 */
export function printMessage(message: string, prefix: string = 'Core'): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${prefix}]: ${message}`);
}

/**
 * Core package version
 */
export const VERSION = '1.0.0'; 