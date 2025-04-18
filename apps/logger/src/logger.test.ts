import { Logger } from './logger';
import { printMessage, VERSION } from '@sui-monorepo/core';

// Mock the core package
jest.mock('@sui-monorepo/core', () => ({
  printMessage: jest.fn(),
  VERSION: '1.0.0-test',
}));

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    // Create a new logger instance before each test
    logger = new Logger();

    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('logVersion', () => {
    it('should log the core package version', () => {
      // Act
      logger.logVersion();

      // Assert
      expect(printMessage).toHaveBeenCalledWith(`Using core package version: ${VERSION}`, 'Logger');
    });
  });

  describe('logMessage', () => {
    it('should increment counter and log a message', () => {
      // Act
      logger.logMessage();

      // Assert
      expect(logger.getCounter()).toBe(1);
      expect(printMessage).toHaveBeenCalledWith('Message #1', 'Logger');

      // Act again
      logger.logMessage();

      // Assert again
      expect(logger.getCounter()).toBe(2);
      expect(printMessage).toHaveBeenCalledWith('Message #2', 'Logger');
    });
  });

  describe('logStartup', () => {
    it('should log a startup message', () => {
      // Act
      logger.logStartup();

      // Assert
      expect(printMessage).toHaveBeenCalledWith('Logger started!', 'Logger');
    });
  });

  describe('logShutdown', () => {
    it('should log a shutdown message', () => {
      // Act
      logger.logShutdown();

      // Assert
      expect(printMessage).toHaveBeenCalledWith('Logger shutting down...', 'Logger');
    });
  });

  describe('resetCounter', () => {
    it('should reset the counter to zero', () => {
      // Arrange
      logger.logMessage(); // Increments counter to 1
      logger.logMessage(); // Increments counter to 2
      expect(logger.getCounter()).toBe(2);

      // Act
      logger.resetCounter();

      // Assert
      expect(logger.getCounter()).toBe(0);
    });
  });

  describe('start', () => {
    beforeEach(() => {
      // Mock setInterval
      jest.useFakeTimers();
    });

    afterEach(() => {
      // Restore timers
      jest.useRealTimers();
    });

    it('should start the logging interval', () => {
      // Act
      logger.start();

      // Assert initial calls
      expect(printMessage).toHaveBeenCalledTimes(2); // Version and startup logs

      // Fast-forward time
      jest.advanceTimersByTime(1000);

      // Assert message logged
      expect(printMessage).toHaveBeenCalledTimes(3);
      expect(logger.getCounter()).toBe(1);

      // Fast-forward time again
      jest.advanceTimersByTime(1000);

      // Assert another message logged
      expect(printMessage).toHaveBeenCalledTimes(4);
      expect(logger.getCounter()).toBe(2);
    });

    it('should restart if already started', () => {
      // Arrange
      logger.start();
      jest.advanceTimersByTime(1000);
      expect(logger.getCounter()).toBe(1);

      // Act
      logger.start(); // Should stop and restart

      // Assert counter reset indirectly by checking calls
      expect(printMessage).toHaveBeenCalledWith('Logger shutting down...', 'Logger');
      expect(printMessage).toHaveBeenCalledWith('Logger started!', 'Logger');
    });
  });

  describe('stop', () => {
    beforeEach(() => {
      // Mock setInterval and clearInterval
      jest.useFakeTimers();
    });

    afterEach(() => {
      // Restore timers
      jest.useRealTimers();
    });

    it('should stop the logging interval', () => {
      // Arrange
      logger.start();
      jest.advanceTimersByTime(1000);
      expect(logger.getCounter()).toBe(1);

      // Act
      logger.stop();

      // Assert
      expect(printMessage).toHaveBeenCalledWith('Logger shutting down...', 'Logger');

      // Fast-forward time
      jest.advanceTimersByTime(2000);

      // Assert counter not incremented
      expect(logger.getCounter()).toBe(1);
    });

    it('should do nothing if not started', () => {
      // Act
      logger.stop();

      // Assert
      expect(printMessage).not.toHaveBeenCalled();
    });
  });
});
