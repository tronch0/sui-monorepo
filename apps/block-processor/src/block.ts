/**
 * Represents a data block to be processed
 */
export interface Block {
  id: string;
  timestamp: number;
  data: string;
  previousBlockId: string | null;
}

/**
 * Creates a new block with generated ID and current timestamp
 * @param data The data to include in the block
 * @param previousBlockId ID of the previous block in the chain
 * @returns A new Block object
 */
export function createBlock(data: string, previousBlockId: string | null = null): Block {
  return {
    id: generateBlockId(),
    timestamp: Date.now(),
    data,
    previousBlockId,
  };
}

/**
 * Generates a random block ID
 * @returns A random string ID
 */
function generateBlockId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
