import react from "@vitejs/plugin-react";
import presetIcons from "unocss/preset-icons";
import uno from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), uno({ presets: [presetIcons()] })],
  envPrefix: "AGORA_",
});
