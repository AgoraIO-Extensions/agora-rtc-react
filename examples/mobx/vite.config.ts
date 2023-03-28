import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import uno from "unocss/vite";
import presetIcons from "unocss/preset-icons";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), uno({ presets: [presetIcons()] })],
  envPrefix: "AGORA_",
});
