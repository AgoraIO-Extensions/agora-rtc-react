import react from "@vitejs/plugin-react";
import presetIcons from "unocss/preset-icons";
import presetUno from "unocss/preset-uno";
import uno from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    // https://uno.antfu.me/
    uno({
      presets: [presetUno(), presetIcons()],
    }),
    react(),
  ],
  envPrefix: "AGORA_",
});
