import { program } from "commander";
import packageJson from "../package.json" with { type: "json" };
import { runServer } from "./server";

program
  .name("esa-mcp-server")
  .description("MCP server for esa.io")
  .version(packageJson.version)
  .action(async () => {
    await runServer();
  });

await program.parseAsync();
