# TypeScript Monorepo

A monorepo containing multiple packages and applications managed with PNPM workspaces.

## Structure

- `packages/core`: Core package for printing messages
- `packages/utils`: Utility package with triangle printing functionality
- `apps/logger`: Application that uses the core package to print messages every second using setInterval
- `apps/rescan-engine`: Application that uses the core package to print messages every second using a while loop
- `apps/block-processor`: Application that simulates processing of data blocks with chain-like references between them

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- PNPM package manager

### Installation

```bash
# Install dependencies
pnpm install
```

### Building

```bash
# Build all packages
pnpm build
```

### Running the Apps

```bash
# Start the logger app (uses setInterval)
pnpm dev

# Start the rescan-engine app (uses while loop)
pnpm dev:rescan

# Start the block-processor app (simulates block chain)
pnpm dev:blocks
```

## Development

### Code Quality

This project uses ESLint and Prettier to enforce code quality and consistent formatting.

```bash
# Run linting
pnpm lint

# Fix linting issues automatically
pnpm lint:fix

# Format code with Prettier
pnpm format

# Check formatting without changing files
pnpm format:check
```

### Testing

The project uses Jest for testing:

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

### Adding Dependencies

To add a dependency to a specific package or app:

```bash
# Example: Add a dependency to the logger app
pnpm --filter logger add <dependency-name>
```

### Working with Workspaces

To run a script in all packages:

```bash
pnpm -r <script-name>
```

To run a script in a specific package:

```bash
pnpm --filter <package-name> <script-name>
```
