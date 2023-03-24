import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: {
    "agora-rtc-react-ui": "src/main.ts",
  },
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  dts: true,
  minify: false,
});
