import { RescanEngine } from './rescan-engine';
import { printMessage, VERSION } from '@sui-monorepo/core';

// Mock the core package
jest.mock('@sui-monorepo/core', () => ({
  printMessage: jest.fn(),
  VERSION: '1.0.0-test',
}));

describe('RescanEngine', () => {
  let engine: RescanEngine;

  beforeEach(() => {
    // Create a new engine instance before each test
    engine = new RescanEngine();

    // Reset all mocks
    jest.clearAllMocks();

    // Mock Date.now to control time
    jest.spyOn(Date, 'now').mockImplementation(() => 1000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('logVersion', () => {
    it('should log the core package version', () => {
      // Act
      engine.logVersion();

      // Assert
      expect(printMessage).toHaveBeenCalledWith(
        `Using core package version: ${VERSION}`,
        'RescanEngine',
      );
    });
  });

  describe('logMessage', () => {
    it('should increment counter and log a message', () => {
      // Act
      engine.logMessage();

      // Assert
      expect(engine.getCounter()).toBe(1);
      expect(printMessage).toHaveBeenCalledWith('Scan #1', 'RescanEngine');

      // Act again
      engine.logMessage();

      // Assert again
      expect(engine.getCounter()).toBe(2);
      expect(printMessage).toHaveBeenCalledWith('Scan #2', 'RescanEngine');
    });
  });

  describe('logStartup', () => {
    it('should log a startup message', () => {
      // Act
      engine.logStartup();

      // Assert
      expect(printMessage).toHaveBeenCalledWith('RescanEngine started!', 'RescanEngine');
    });
  });

  describe('logShutdown', () => {
    it('should log a shutdown message', () => {
      // Act
      engine.logShutdown();

      // Assert
      expect(printMessage).toHaveBeenCalledWith('RescanEngine shutting down...', 'RescanEngine');
    });
  });

  describe('resetCounter', () => {
    it('should reset the counter to zero', () => {
      // Arrange
      engine.logMessage(); // Increments counter to 1
      engine.logMessage(); // Increments counter to 2
      expect(engine.getCounter()).toBe(2);

      // Act
      engine.resetCounter();

      // Assert
      expect(engine.getCounter()).toBe(0);
    });
  });

  describe('start', () => {
    beforeEach(() => {
      // Mock sleep method to avoid actual waiting
      jest.spyOn(engine as any, 'sleep').mockResolvedValue(undefined);
    });

    it('should start and log messages at specified intervals', async () => {
      // Setup counter for Date.now mock
      let timeCounter = 1000;
      jest.spyOn(Date, 'now').mockImplementation(() => {
        timeCounter += 1000; // Increment by 1 second each call
        return timeCounter;
      });

      // Start the engine but immediately stop it after first iteration
      const startPromise = engine.start();

      // Wait a bit to ensure the first iteration runs
      await new Promise(resolve => setTimeout(resolve, 10));

      // Now stop the engine
      engine.stop();

      // Resolve the start promise
      await startPromise;

      // Assert initial calls
      expect(printMessage).toHaveBeenCalledWith(
        `Using core package version: ${VERSION}`,
        'RescanEngine',
      );
      expect(printMessage).toHaveBeenCalledWith('RescanEngine started!', 'RescanEngine');
      expect(printMessage).toHaveBeenCalledWith('Scan #1', 'RescanEngine');
      expect(printMessage).toHaveBeenCalledWith('RescanEngine shutting down...', 'RescanEngine');
    });

    it('should stop properly', async () => {
      // Start the engine
      const startPromise = engine.start();

      // Wait a bit
      await new Promise(resolve => setTimeout(resolve, 10));

      // Stop the engine
      engine.stop();

      // Resolve the start promise
      await startPromise;

      // Assert
      expect(printMessage).toHaveBeenCalledWith('RescanEngine shutting down...', 'RescanEngine');
    });
  });
});
