import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import packageJson from "../package.json" with { type: "json" };
import { registerTools } from "./mcp/tools";

export async function runServer() {
  // Create MCP server
  const server = new McpServer({
    name: "MCP_SERVER", // TODO: Change this to the name of the server
    version: packageJson.version,
  });

  // Register tools
  registerTools(server);

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
