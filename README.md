**TODO: Replace `MCP_SERVER` with the name of the server**

# MCP_SERVER

<!-- [![Version](https://img.shields.io/github/v/release/koki-develop/MCP_SERVER)](https://github.com/koki-develop/MCP_SERVER/releases/latest)
[![License](https://img.shields.io/github/license/koki-develop/MCP_SERVER)](./LICENSE)
[![Docker](https://img.shields.io/badge/docker-ghcr.io-blue.svg)](https://github.com/koki-develop/MCP_SERVER/pkgs/container/MCP_SERVER) -->

**TODO: Description**

## Table of Contents

- [Usage](#usage)
- [MCP Tools](#mcp-tools)
- [License](#license)

## Usage

To use this server with an MCP client, add the following configuration:

```json
{
  "mcpServers": {
    "todoist": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "ghcr.io/koki-develop/MCP_SERVER:latest"
      ]
    }
  }
}
```

## MCP Tools

**TODO: Add MCP tools here**

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

Copyright (c) 2025 Koki Sato
