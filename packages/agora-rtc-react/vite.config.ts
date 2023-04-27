/* eslint-env node */

/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "c8",
      reporter: ["text", "json", "html", "lcov"],
    },
    setupFiles: ["./test/setup.tsx"],
  },
});
