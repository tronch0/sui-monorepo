import { BlockProcessor } from './block-processor';
import { printMessage, VERSION } from '@sui-monorepo/core';
import { Block } from './block';

// Mock the core package
jest.mock('@sui-monorepo/core', () => ({
  printMessage: jest.fn(),
  VERSION: '1.0.0-test',
}));

describe('BlockProcessor', () => {
  let processor: BlockProcessor;

  beforeEach(() => {
    // Create a new processor instance before each test
    processor = new BlockProcessor();

    // Reset all mocks
    jest.clearAllMocks();

    // Mock setInterval to avoid actual timing
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Cleanup
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('logVersion', () => {
    it('should log the core package version', () => {
      // Act
      processor.logVersion();

      // Assert
      expect(printMessage).toHaveBeenCalledWith(
        `Using core package version: ${VERSION}`,
        'BlockProcessor',
      );
    });
  });

  describe('logStartup', () => {
    it('should log a startup message', () => {
      // Act
      processor.logStartup();

      // Assert
      expect(printMessage).toHaveBeenCalledWith('BlockProcessor started!', 'BlockProcessor');
    });
  });

  describe('logShutdown', () => {
    it('should log a shutdown message', () => {
      // Act
      processor.logShutdown();

      // Assert
      expect(printMessage).toHaveBeenCalledWith(
        'BlockProcessor shutting down...',
        'BlockProcessor',
      );
    });
  });

  describe('processBlock', () => {
    it('should process a block and add it to the chain', () => {
      // Arrange
      const block: Block = {
        id: 'test-block-1',
        timestamp: Date.now(),
        data: 'Test Block',
        previousBlockId: null,
      };

      // Act
      processor.processBlock(block);

      // Assert
      expect(processor.getBlockCount()).toBe(1);
      expect(processor.getBlocks()[0]).toEqual(block);
      expect(printMessage).toHaveBeenCalledWith(
        `Processing block ${block.id} with data: ${block.data}`,
        'BlockProcessor',
      );
      expect(printMessage).toHaveBeenCalledWith(
        `Block ${block.id} processed successfully. Total blocks: 1`,
        'BlockProcessor',
      );
    });

    it('should warn about missing previous block reference', () => {
      // Arrange - first add a block to make the chain non-empty
      const block1: Block = {
        id: 'test-block-1',
        timestamp: Date.now(),
        data: 'Test Block 1',
        previousBlockId: null,
      };
      processor.processBlock(block1);

      // Reset mock to clear previous calls
      jest.clearAllMocks();

      // Create a block with reference to non-existent previous block
      const block2: Block = {
        id: 'test-block-2',
        timestamp: Date.now(),
        data: 'Test Block 2',
        previousBlockId: 'non-existent-id',
      };

      // Act
      processor.processBlock(block2);

      // Assert
      expect(processor.getBlockCount()).toBe(2);
      expect(printMessage).toHaveBeenCalledWith(
        `Warning: Block ${block2.id} references unknown previous block ${block2.previousBlockId}`,
        'BlockProcessor',
      );
    });
  });

  describe('generateBlock', () => {
    it('should generate a new block', () => {
      // Act
      const block = processor.generateBlock();

      // Assert
      expect(block).toBeDefined();
      expect(block.id).toBeDefined();
      expect(block.data).toContain('Block data');
      expect(block.previousBlockId).toBeNull();
      expect(printMessage).toHaveBeenCalledWith(
        `Generated new block with ID: ${block.id}`,
        'BlockProcessor',
      );
    });

    it('should link to previous block if one exists', () => {
      // Arrange - first add a block
      const block1 = processor.generateBlock();
      processor.processBlock(block1);

      // Reset mock to clear previous calls
      jest.clearAllMocks();

      // Act - generate another block
      const block2 = processor.generateBlock();

      // Assert
      expect(block2.previousBlockId).toBe(block1.id);
    });
  });

  describe('start', () => {
    it('should start generating and processing blocks', () => {
      // Act
      processor.start();

      // Assert initial calls
      expect(printMessage).toHaveBeenCalledWith(
        `Using core package version: ${VERSION}`,
        'BlockProcessor',
      );
      expect(printMessage).toHaveBeenCalledWith('BlockProcessor started!', 'BlockProcessor');

      // Advance timers to trigger block generation
      jest.advanceTimersByTime(2000); // Default block generation rate

      // Should have generated and processed a block
      expect(processor.getBlockCount()).toBe(1);

      // Advance more to generate another block
      jest.advanceTimersByTime(2000);

      // Should now have 2 blocks
      expect(processor.getBlockCount()).toBe(2);
    });

    it('should log block chain status at the specified rate', () => {
      // Arrange - start with a block already
      const block = processor.generateBlock();
      processor.processBlock(block);

      // Reset mock
      jest.clearAllMocks();

      // Act
      processor.start(500); // 500ms status update rate

      // Advance timers to trigger status logging
      jest.advanceTimersByTime(500);

      // Assert
      expect(printMessage).toHaveBeenCalledWith('Current block chain length: 1', 'BlockProcessor');
    });
  });

  describe('stop', () => {
    it('should stop the processor', () => {
      // Arrange
      processor.start();

      // Reset mock
      jest.clearAllMocks();

      // Act
      processor.stop();

      // Assert
      expect(printMessage).toHaveBeenCalledWith(
        'BlockProcessor shutting down...',
        'BlockProcessor',
      );

      // Advance timers - should not generate new blocks
      jest.advanceTimersByTime(5000);

      // Block count should remain the same after stopping
      expect(processor.getBlockCount()).toBe(0);
    });
  });

  describe('clear', () => {
    it('should clear all blocks', () => {
      // Arrange - add some blocks
      processor.processBlock({
        id: 'test-1',
        timestamp: Date.now(),
        data: 'test',
        previousBlockId: null,
      });
      processor.processBlock({
        id: 'test-2',
        timestamp: Date.now(),
        data: 'test',
        previousBlockId: 'test-1',
      });

      expect(processor.getBlockCount()).toBe(2);

      // Reset mock
      jest.clearAllMocks();

      // Act
      processor.clear();

      // Assert
      expect(processor.getBlockCount()).toBe(0);
      expect(printMessage).toHaveBeenCalledWith('All blocks cleared', 'BlockProcessor');
    });
  });
});
