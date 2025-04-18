import { RescanEngine } from './rescan-engine';

// Create the engine
const engine = new RescanEngine();

// Start the engine (this is async, but we don't need to await)
engine.start().catch(error => {
  console.error('Error in RescanEngine:', error);
  process.exit(1);
});

// Handle termination gracefully
process.on('SIGINT', () => {
  engine.stop();
  process.exit(0);
});
