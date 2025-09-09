import { $ } from "bun";

await $`rm -rf dist`;

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist/docker",
  target: "bun",
  packages: "external",
});

await Bun.build({
  banner: "#!/usr/bin/env node",
  entrypoints: ["./src/index.ts"],
  outdir: "./dist/npm",
  target: "node",
  packages: "external",
});

await $`chmod +x dist/docker/index.js`;
await $`chmod +x dist/npm/index.js`;
