/**
 * Triangle drawing utilities
 */

/**
 * Options for triangle printing
 */
export interface TriangleOptions {
  /** Height of the triangle (number of rows) */
  height?: number;
  /** Character to use for the triangle */
  character?: string;
  /** Whether to align the triangle to the left */
  leftAlign?: boolean;
}

/**
 * Default options for triangle printing
 */
const DEFAULT_OPTIONS: TriangleOptions = {
  height: 5,
  character: '*',
  leftAlign: false,
};

/**
 * Generates a triangle as a string
 * @param options Triangle printing options
 * @returns A string representation of the triangle
 */
export function generateTriangle(options: TriangleOptions = {}): string {
  const { height, character, leftAlign } = { ...DEFAULT_OPTIONS, ...options };

  const rows: string[] = [];

  for (let i = 0; i < height!; i++) {
    // Calculate the number of characters in this row
    const charCount = i * 2 + 1;

    // Calculate spaces before the characters (for centered triangle)
    const spacesCount = leftAlign ? 0 : height! - i - 1;

    // Build the row
    const spaces = ' '.repeat(spacesCount);
    const chars = character!.repeat(charCount);
    rows.push(spaces + chars);
  }

  return rows.join('\n');
}
