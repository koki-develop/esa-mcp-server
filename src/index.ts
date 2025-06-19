import { program } from "commander";
import packageJson from "../package.json" with { type: "json" };
import { runServer } from "./server";

program
  .name("esa-mcp-server")
  .description("MCP server for esa.io")
  .version(packageJson.version)
  .option(
    "--readonly",
    "Enable read-only mode (only read operations are available)",
    false,
  )
  .action(async (options: { readonly: boolean }) => {
    await runServer(options.readonly);
  });

await program.parseAsync();
