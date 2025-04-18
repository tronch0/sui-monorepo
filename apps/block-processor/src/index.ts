import { BlockProcessor } from './block-processor';

// Create the processor with a block generation rate of 3 seconds
const processor = new BlockProcessor(3000);

// Start the processor with a processing status update rate of 1 second
processor.start(1000);

// Handle termination gracefully
process.on('SIGINT', () => {
  processor.stop();
  process.exit(0);
});
