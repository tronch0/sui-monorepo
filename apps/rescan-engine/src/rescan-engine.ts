import { printMessage, VERSION } from '@sui-monorepo/core';

export class RescanEngine {
  private counter: number = 0;
  private running: boolean = false;
  private lastLogTime: number = 0;

  constructor() {}

  /**
   * Logs the version of the core package
   */
  logVersion(): void {
    printMessage(`Using core package version: ${VERSION}`, 'RescanEngine');
  }

  /**
   * Logs a message with an incremented counter
   */
  logMessage(): void {
    this.counter++;
    printMessage(`Scan #${this.counter}`, 'RescanEngine');
  }

  /**
   * Logs a startup message
   */
  logStartup(): void {
    printMessage('RescanEngine started!', 'RescanEngine');
  }

  /**
   * Logs a shutdown message
   */
  logShutdown(): void {
    printMessage('RescanEngine shutting down...', 'RescanEngine');
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
   * Sleep for the specified number of milliseconds
   * @param ms Milliseconds to sleep
   */
  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Starts the engine with a while loop
   * @param intervalMs Milliseconds between logs
   */
  async start(intervalMs: number = 1000): Promise<void> {
    if (this.running) {
      this.stop();
    }

    this.running = true;
    this.logVersion();
    this.logStartup();

    // Run a while loop that logs messages at the specified interval
    this.lastLogTime = Date.now();

    while (this.running) {
      const currentTime = Date.now();
      const elapsed = currentTime - this.lastLogTime;

      if (elapsed >= intervalMs) {
        this.logMessage();
        this.lastLogTime = currentTime;
      }

      // Small delay to prevent CPU hogging
      await this.sleep(100);
    }
  }

  /**
   * Stops the engine
   */
  stop(): void {
    if (this.running) {
      this.running = false;
      this.logShutdown();
    }
  }
}
