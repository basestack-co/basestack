import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["src/index.ts"],
    splitting: false,
    sourcemap: false,
    clean: true,
    minify: false, // !options.watch,
    noExternal: [/^node-fetch($|\/)/],
  };
});
