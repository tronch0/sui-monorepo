import { printMessage, VERSION } from '@sui-monorepo/core';

export class Logger {
  private counter: number = 0;
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {}

  /**
   * Logs the version of the core package
   */
  logVersion(): void {
    printMessage(`Using core package version: ${VERSION}`, 'Logger');
  }

  /**
   * Logs a message with an incremented counter
   */
  logMessage(): void {
    this.counter++;
    printMessage(`Message #${this.counter}`, 'Logger');
  }

  /**
   * Logs a startup message
   */
  logStartup(): void {
    printMessage('Logger started!', 'Logger');
  }

  /**
   * Logs a shutdown message
   */
  logShutdown(): void {
    printMessage('Logger shutting down...', 'Logger');
  }

  /**
   * Resets the counter
   */
  resetCounter(): void {
    this.counter = 0;
  }

  /**
   * Gets the current counter value
   */
  getCounter(): number {
    return this.counter;
  }

  /**
   * Starts the logging interval
   * @param intervalMs Milliseconds between logs
   */
  start(intervalMs: number = 1000): void {
    if (this.intervalId) {
      this.stop();
    }

    this.logVersion();
    this.logStartup();

    this.intervalId = setInterval(() => {
      this.logMessage();
    }, intervalMs);
  }

  /**
   * Stops the logging interval
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.logShutdown();
    }
  }
}
