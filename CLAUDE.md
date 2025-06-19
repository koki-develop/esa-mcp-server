# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server for [esa.io](https://esa.io) (information sharing service). It enables MCP clients (like Claude Desktop or Cody) to interact with esa.io's API.

## Development Commands

### Build, Type Check, and Lint
```bash
# Build the project (outputs to dist/)
bun run build

# TypeScript type checking
bun run typecheck

# Check code with Biome
bun run lint

# Auto-fix code with Biome
bun run fmt
```

### Dependency Management
```bash
# Install dependencies
bun install

# Add dependencies
bun add <package-name>
bun add -D <package-name>  # Development dependencies
```

## Architecture

### Directory Structure
- `src/index.ts` - Entry point (runs MCP protocol via stdio)
- `src/server.ts` - MCP server implementation (server name, tool registration)
- `src/mcp/tools/` - MCP tool definitions (implement each tool here)
- `scripts/build.ts` - Bun build script (generates executable)

### Build System
- Uses Bun's native build capabilities to generate a single executable
- Build configuration managed in `scripts/build.ts`
- Dockerfile uses multi-stage build

### How to Implement MCP Tools
1. Create new tool in `src/mcp/tools/`
2. Define input using zod schema
3. Register tool in `src/mcp/tools/index.ts`
4. Add to tools object in `src/server.ts`

### Current Implementation Status
- Basic MCP server structure implemented
- `get_current_time` tool exists as a sample
- esa.io API integration not yet implemented

## Important Notes
- Code formatter is Biome (not ESLint)
- Package manager is Bun (not npm or yarn)
- TypeScript strict mode enabled
- No test framework configured yet