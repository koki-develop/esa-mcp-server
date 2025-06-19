import { $ } from "bun";

await $`rm -rf dist`;

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "bun",
  packages: "external",
});

await $`chmod +x dist/index.js`;
