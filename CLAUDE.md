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

### Testing
```bash
# Run MCP Inspector for manual testing
bun run inspector
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
- `src/lib/esa/` - esa.io API client implementation
  - `index.ts` - Esa class (API client)
  - `types.ts` - Zod schemas and type definitions
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
- esa.io API client (`Esa` class) with Bearer auth
- Environment variables: `ESA_TEAM`, `ESA_ACCESS_TOKEN`

#### Implemented Tools
- `get_posts` - fetches posts with filtering, sorting, pagination
- `get_post` - fetches specific post by number
- `create_post` - creates new post
- `update_post` - updates existing post
- `delete_post` - deletes post
- `get_tags` - fetches all tags
- `get_post_comments` - fetches comments for a post
- `create_post_comment` - creates comment on post (write operation)

#### CLI Options
- `--readonly` - Enable read-only mode that only allows read operations (get_posts, get_post, get_tags, get_post_comments). Write operations (create_post, update_post, delete_post, create_post_comment) are disabled when this flag is used.

#### TODO (from TODO file)
- `update_comment` - update existing comment
- `delete_comment` - delete comment

## Important Notes
- Code formatter is Biome (not ESLint)
- Package manager is Bun (not npm or yarn)
- TypeScript strict mode enabled
- Git hooks run Biome formatting on commit
- All API inputs/outputs validated with Zod schemas
- No test files exist yet - CI runs `bun test` but tests are not implemented