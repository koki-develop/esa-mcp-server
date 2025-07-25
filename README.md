# esa MCP Server

[![Version](https://img.shields.io/github/v/release/koki-develop/esa-mcp-server)](https://github.com/koki-develop/esa-mcp-server/releases/latest)
[![License](https://img.shields.io/github/license/koki-develop/esa-mcp-server)](./LICENSE)
[![Docker](https://img.shields.io/badge/docker-ghcr.io-blue.svg)](https://github.com/koki-develop/esa-mcp-server/pkgs/container/esa-mcp-server)

A Model Context Protocol (MCP) server for [esa.io](https://esa.io).

## Table of Contents

- [Usage](#usage)
- [MCP Tools](#mcp-tools)
  - [Posts](#posts)
  - [Tags](#tags)
  - [Comments](#comments)
- [License](#license)

## Usage

### Prerequisites

Before using this MCP server, you need to generate a personal access token from your esa.io team:

1. Go to `https://<TEAM_NAME>.esa.io/user/applications`
2. Create a new personal access token
3. Copy the token for configuration

### Configuration

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
        "ESA_ACCESS_TOKEN=<your-personal-access-token>",
        "ghcr.io/koki-develop/esa-mcp-server:latest"
      ]
    }
  }
}
```

Replace `<your-team-name>` and `<your-personal-access-token>` with your team name and personal access token.

#### Read-only Mode

To enable read-only mode that only allows read operations, add the `--readonly` flag:

```json
{
  "mcpServers": {
    "esa-readonly": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "ESA_TEAM=<your-team-name>",
        "-e",
        "ESA_ACCESS_TOKEN=<your-personal-access-token>",
        "ghcr.io/koki-develop/esa-mcp-server:latest",
        "--readonly"
      ]
    }
  }
}
```

In read-only mode, only the following operations are available:
- `get_posts` - retrieve posts
- `get_post` - retrieve a specific post
- `get_tags` - retrieve tags
- `get_post_comments` - retrieve post comments

Write operations (`create_post`, `update_post`, `delete_post`, `create_post_comment`, `update_comment`, `delete_comment`) are disabled.

## MCP Tools

- [Posts](#posts)
- [Tags](#tags)
- [Comments](#comments)

### Posts

| Tool | Description |
|------|-------------|
| `get_posts` | Retrieve a list of posts from the esa team. Supports search queries, filtering, sorting, and pagination. Returns post metadata including title, content, tags, categories, author information, and engagement metrics (comments, stars, watches). Optionally includes comments and stargazers with the include parameter. Supports nested inclusion like 'comments,comments.stargazers'. Note: Post content (body_md) is truncated to 300 characters with a body_truncated field indicating if truncation occurred to reduce context size. |
| `get_post` | Retrieve a specific post from the esa team by post number. Returns complete post details including title, content (markdown), tags, category, author information, revision history, and engagement metrics. Optionally includes comments and stargazers. Supports nested inclusion like 'comments,comments.stargazers'. |
| `create_post` | Create a new post in the esa team. Requires a title and optionally accepts content, tags, category, WIP status, and other metadata. Returns the created post information including the assigned post number and URL. |
| `update_post` | Update an existing post in the esa team. Requires a post number and optionally accepts updated content, tags, category, WIP status, and other metadata. Returns the updated post information including revision details. |
| `delete_post` | Delete an existing post from the esa team. Requires a post number. The post will be permanently deleted and cannot be recovered. Returns a confirmation message upon successful deletion. |

### Tags

| Tool | Description |
|------|-------------|
| `get_tags` | Get a list of all tags used in the esa team. Returns tags with their names and the number of posts they are attached to, sorted by post count in descending order. Supports pagination. |

### Comments

| Tool | Description |
|------|-------------|
| `get_post_comments` | Retrieve a list of comments for a specific post from the esa team. Requires a post number and supports pagination. Returns comment metadata including content, author information, timestamps, and engagement metrics (stars). |
| `create_post_comment` | Create a new comment on an existing post in the esa team. Requires a post number and comment content in Markdown format. Returns the created comment information including ID, content, timestamps, and author details. |
| `update_comment` | Update an existing comment on a post in the esa team. Requires a comment ID and new content in Markdown format. Returns the updated comment information including content, timestamps, and author details. |
| `delete_comment` | Delete an existing comment from the esa team. Requires a comment ID. The comment will be permanently deleted and cannot be recovered. Returns a confirmation message upon successful deletion. |
## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

Copyright (c) 2025 Koki Sato
