# Esa MCP Server

[![Version](https://img.shields.io/github/v/release/koki-develop/esa-mcp-server)](https://github.com/koki-develop/esa-mcp-server/releases/latest)
[![License](https://img.shields.io/github/license/koki-develop/esa-mcp-server)](./LICENSE)
[![Docker](https://img.shields.io/badge/docker-ghcr.io-blue.svg)](https://github.com/koki-develop/esa-mcp-server/pkgs/container/esa-mcp-server)

A Model Context Protocol (MCP) server for [esa.io](https://esa.io).

## Table of Contents

- [Usage](#usage)
- [MCP Tools](#mcp-tools)
- [License](#license)

## Usage

To use this server with an MCP client, add the following configuration:

```json
{
  "mcpServers": {
    "esa": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "ESA_TEAM=<your-team-name>",
        "-e",
        "ESA_ACCESS_TOKEN=<your-access-token>",
        "ghcr.io/koki-develop/esa-mcp-server:latest"
      ]
    }
  }
}
```

Replace `<your-team-name>` and `<your-access-token>` with your team name and access token.

## MCP Tools

- [Posts](#posts)
  - [get_posts](#get_posts)
  - [create_post](#create_post)

### Posts

#### `get_posts`

Retrieve a list of posts from the esa team. Supports search queries, filtering, sorting, and pagination. Returns post metadata including title, content, tags, categories, author information, and engagement metrics (comments, stars, watches).

#### `create_post`

Create a new post in the esa team. Requires a title and optionally accepts content, tags, category, WIP status, and other metadata. Returns the created post information including the assigned post number and URL.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

Copyright (c) 2025 Koki Sato
