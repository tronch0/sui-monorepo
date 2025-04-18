import { generateTriangle } from './triangle';

describe('Triangle Utilities', () => {
  describe('generateTriangle', () => {
    it('should generate a default triangle with height 5', () => {
      // Act
      const result = generateTriangle();

      // Assert
      expect(result.split('\n').length).toBe(5);
      expect(result).toBe('    *\n   ***\n  *****\n *******\n*********');
    });

    it('should generate a triangle with custom height', () => {
      // Act
      const result = generateTriangle({ height: 3 });

      // Assert
      expect(result.split('\n').length).toBe(3);
      expect(result).toBe('  *\n ***\n*****');
    });

    it('should generate a triangle with custom character', () => {
      // Act
      const result = generateTriangle({ height: 3, character: '#' });

      // Assert
      expect(result).toBe('  #\n ###\n#####');
    });

    it('should generate a left-aligned triangle when specified', () => {
      // Act
      const result = generateTriangle({ height: 3, leftAlign: true });

      // Assert
      expect(result).toBe('*\n***\n*****');
    });

    it('should generate a custom left-aligned triangle with custom character', () => {
      // Act
      const result = generateTriangle({
        height: 4,
        character: '+',
        leftAlign: true,
      });

      // Assert
      expect(result).toBe('+\n+++\n+++++\n+++++++');
    });
  });
});
