import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    splitting: true,
    sourcemap: true,
    dts: true,
    clean: true,
    minify: !options.watch,
    target: "es5",
    /* outExtension({ format }) {
      return {
        js: `.${format}.js`,
      };
    }, */
    /*  esbuildOptions(options) {
      options.external = ['@emotion/*'];
    }, */
  };
});
