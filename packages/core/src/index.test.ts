import { printMessage, VERSION } from './index';

describe('Core Package', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock console.log
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    // Mock Date.prototype.toISOString
    const mockDate = new Date('2023-01-01T12:00:00Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    jest.spyOn(mockDate, 'toISOString').mockReturnValue('2023-01-01T12:00:00.000Z');
  });

  afterEach(() => {
    // Restore mocks
    consoleLogSpy.mockRestore();
    jest.restoreAllMocks();
  });

  describe('printMessage', () => {
    it('should log message with timestamp and default prefix', () => {
      // Act
      printMessage('Hello world');

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith('[2023-01-01T12:00:00.000Z] [Core]: Hello world');
    });

    it('should log message with timestamp and custom prefix', () => {
      // Act
      printMessage('Hello world', 'CustomPrefix');

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[2023-01-01T12:00:00.000Z] [CustomPrefix]: Hello world',
      );
    });
  });

  describe('VERSION', () => {
    it('should be defined', () => {
      expect(VERSION).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof VERSION).toBe('string');
    });
  });
});
