/* eslint-env node */

import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    test: {
      environment: "jsdom",
      coverage: {
        provider: "c8",
        reporter: ["text", "json", "html", "lcov"],
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/main.ts"),
        formats: ["es", "cjs"],
      },
      outDir: "dist",
      sourcemap: isProd,
      minify: false,
    },
  };
});
