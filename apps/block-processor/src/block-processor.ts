import { printMessage, VERSION } from '@sui-monorepo/core';
import { Block, createBlock } from './block';

export class BlockProcessor {
  private running: boolean = false;
  private blocks: Block[] = [];
  private processingInterval: NodeJS.Timeout | null = null;
  private generationInterval: NodeJS.Timeout | null = null;

  constructor(private readonly blockGenerationRate: number = 2000) {}

  /**
   * Logs the version of the core package
   */
  logVersion(): void {
    printMessage(`Using core package version: ${VERSION}`, 'BlockProcessor');
  }

  /**
   * Logs a startup message
   */
  logStartup(): void {
    printMessage('BlockProcessor started!', 'BlockProcessor');
  }

  /**
   * Logs a shutdown message
   */
  logShutdown(): void {
    printMessage('BlockProcessor shutting down...', 'BlockProcessor');
  }

  /**
   * Gets the current block count
   */
  getBlockCount(): number {
    return this.blocks.length;
  }

  /**
   * Gets all blocks
   */
  getBlocks(): Block[] {
    return [...this.blocks];
  }

  /**
   * Processes a block
   * @param block The block to process
   */
  processBlock(block: Block): void {
    printMessage(`Processing block ${block.id} with data: ${block.data}`, 'BlockProcessor');

    // Validate block
    if (block.previousBlockId !== null) {
      const previousBlockExists = this.blocks.some(b => b.id === block.previousBlockId);
      if (!previousBlockExists && this.blocks.length > 0) {
        printMessage(
          `Warning: Block ${block.id} references unknown previous block ${block.previousBlockId}`,
          'BlockProcessor',
        );
      }
    }

    // Add to processed blocks
    this.blocks.push(block);

    printMessage(
      `Block ${block.id} processed successfully. Total blocks: ${this.blocks.length}`,
      'BlockProcessor',
    );
  }

  /**
   * Generates a new block and adds it for processing
   */
  generateBlock(): Block {
    const previousBlock = this.blocks.length > 0 ? this.blocks[this.blocks.length - 1] : null;
    const previousBlockId = previousBlock ? previousBlock.id : null;
    const data = `Block data ${Date.now()}`;

    const block = createBlock(data, previousBlockId);
    printMessage(`Generated new block with ID: ${block.id}`, 'BlockProcessor');

    return block;
  }

  /**
   * Starts the block processor
   * @param processingRate How often to process blocks (ms)
   */
  start(processingRate: number = 1000): void {
    if (this.running) {
      this.stop();
    }

    this.running = true;
    this.logVersion();
    this.logStartup();

    // Start generating blocks at the specified rate
    this.generationInterval = setInterval(() => {
      if (this.running) {
        const block = this.generateBlock();
        this.processBlock(block);
      }
    }, this.blockGenerationRate);

    // Optional - could also simulate a separate processing cycle
    this.processingInterval = setInterval(() => {
      if (this.running && this.blocks.length > 0) {
        const blockCount = this.blocks.length;
        printMessage(`Current block chain length: ${blockCount}`, 'BlockProcessor');
      }
    }, processingRate);
  }

  /**
   * Stops the block processor
   */
  stop(): void {
    if (this.running) {
      this.running = false;

      if (this.generationInterval) {
        clearInterval(this.generationInterval);
        this.generationInterval = null;
      }

      if (this.processingInterval) {
        clearInterval(this.processingInterval);
        this.processingInterval = null;
      }

      this.logShutdown();
    }
  }

  /**
   * Clears all blocks
   */
  clear(): void {
    this.blocks = [];
    printMessage('All blocks cleared', 'BlockProcessor');
  }
}
