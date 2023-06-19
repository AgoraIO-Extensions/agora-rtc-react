import { defineConfig } from "tsup";

import pkg from "./package.json";

export default defineConfig([
  {
    entry: {
      [pkg.name]: "src/index.ts",
    },
    format: ["cjs", "esm"],
    splitting: false,
    sourcemap: false,
    clean: true,
    treeshake: true,
    dts: true,
    minify: false,
  },
  {
    entry: {
      [pkg.name]: "src/index.ts",
    },
    banner: () => {
      return {
        js: `
/**
* ${pkg.name}-v${pkg.version} Copyright AgoraInc.
*/
       `,
      };
    },
    outExtension: () => {
      return {
        js: `.v_${pkg.version}.js`,
      };
    },
    format: ["iife"],
    sourcemap: true,
    splitting: false,
    clean: true,
    minify: false,
    target: "es5",
  },
]);
