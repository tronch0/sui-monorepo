import { utils } from './index';

describe('Utils Object', () => {
  describe('getTriangle', () => {
    it('should return a triangle string', () => {
      // Act
      const result = utils.getTriangle({ height: 3 });

      // Assert
      expect(result).toBe('  *\n ***\n*****');
    });
  });

  describe('printTriangle', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
      // Mock console.log
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      // Restore the mock
      consoleLogSpy.mockRestore();
    });

    it('should print a triangle to console', () => {
      // Act
      utils.printTriangle({ height: 3 });

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith('  *\n ***\n*****');
    });

    it('should use default options when none provided', () => {
      // Act
      utils.printTriangle();

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith('    *\n   ***\n  *****\n *******\n*********');
    });
  });
});
