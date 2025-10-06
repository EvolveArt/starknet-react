import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/providers/index.ts",
    "src/providers/paymaster/index.ts",
    "src/explorers/index.ts",
    "src/utils.ts",
  ],
  splitting: false,
  sourcemap: true,
  dts: true,
  clean: true,
  external: ["starknet"],
  format: ["esm"],
});
