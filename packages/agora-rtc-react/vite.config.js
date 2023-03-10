/* eslint-env node */

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      provider: "c8",
      reporter: ["text", "json", "html", "lcov"],
    },
  },
});
