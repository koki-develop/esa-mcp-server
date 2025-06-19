import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerTools(server: McpServer) {
  // TODO: Register tools here
  server.tool("get_current_time", "Get the current time", {}, async () => {
    return {
      content: [{ type: "text", text: new Date().toISOString() }],
    };
  });
}
