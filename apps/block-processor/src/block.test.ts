import { Block, createBlock } from './block';

describe('Block', () => {
  beforeEach(() => {
    // Mock Date.now to return a consistent timestamp
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createBlock', () => {
    it('should create a block with the provided data', () => {
      // Act
      const block = createBlock('test data');

      // Assert
      expect(block).toBeDefined();
      expect(block.data).toBe('test data');
      expect(block.timestamp).toBe(1234567890);
      expect(block.previousBlockId).toBeNull();
      expect(block.id).toBeDefined();
      expect(typeof block.id).toBe('string');
    });

    it('should create a block with a reference to previous block', () => {
      // Act
      const block = createBlock('test data', 'previous-id');

      // Assert
      expect(block).toBeDefined();
      expect(block.data).toBe('test data');
      expect(block.previousBlockId).toBe('previous-id');
    });

    it('should generate different IDs for different blocks', () => {
      // Act
      const block1 = createBlock('test data 1');
      const block2 = createBlock('test data 2');

      // Assert
      expect(block1.id).not.toBe(block2.id);
    });
  });
});
