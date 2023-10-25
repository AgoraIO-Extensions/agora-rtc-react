/* eslint-env node */

/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    onConsoleLog(log) {
      if (log.includes("Agora RTC client not found")) return false;
      if (log.includes("Agora-SDK [DEBUG]: ")) return false;
      if (log.includes("Agora-SDK [WARNING]: ")) return false;
      if (log.includes("Agora-SDK [ERROR]: ")) return false;
      if (log.includes("Agora-SDK [INFO]: ")) return false;
      if (log.includes("Agora-RTC-REACT [ERROR_TEST_MSG]")) return false;
    },
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov", "json-summary"],
      exclude: [
        "src/misc/*",
        "src/stories/*",
        "src/assets/*",
        "src/*/index.ts",
        "src/hooks/tools.ts",
        "test/**",
        "src/rtc.ts",
      ],
    },
    exclude: ["**/node_modules/**"],
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    setupFiles: ["../shared/test/setup.tsx"],
  },
});
