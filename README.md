# TypeScript Monorepo

A monorepo containing multiple packages and applications managed with PNPM workspaces.

## Structure

- `packages/core`: Core package for printing messages
- `apps/logger`: Application that uses the core package to print messages every second

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

### Running the Logger App

```bash
# Start the logger app
pnpm dev
```

## Development

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
``` # sui-monorepo
