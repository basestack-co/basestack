import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["src/index.ts", "src/utils/helpers.ts"],
    format: ["cjs", "esm"],
    splitting: true,
    sourcemap: false,
    clean: true,
    minify: !options.watch,
    // noExternal: [/^node-fetch($|\/)/],
    // external: ["cross-fetch", "zustand"],
    target: "es5",
  };
});
