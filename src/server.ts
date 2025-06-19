import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import packageJson from "../package.json" with { type: "json" };
import { Esa } from "./lib/esa";
import { registerTools } from "./mcp/tools";

export async function runServer() {
  const team = process.env.ESA_TEAM;
  const accessToken = process.env.ESA_ACCESS_TOKEN;
  if (!team || !accessToken) {
    throw new Error("ESA_TEAM and ESA_ACCESS_TOKEN must be set");
  }

  const esa = new Esa({
    teamName: team,
    accessToken: accessToken,
  });

  // Create MCP server
  const server = new McpServer({
    name: "esa",
    version: packageJson.version,
  });

  // Register tools
  registerTools(server, esa);

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
