import { generateTriangle, TriangleOptions } from './triangle';

/**
 * Utils object with various utility functions
 */
export const utils = {
  /**
   * Prints a triangle to the console
   * @param options Triangle options
   */
  printTriangle: (options: TriangleOptions = {}): void => {
    const triangleStr = generateTriangle(options);
    console.log(triangleStr);
  },

  /**
   * Returns a triangle as a string without printing it
   * @param options Triangle options
   * @returns String representation of a triangle
   */
  getTriangle: (options: TriangleOptions = {}): string => {
    return generateTriangle(options);
  },
};

// Also export the types
export type { TriangleOptions };
