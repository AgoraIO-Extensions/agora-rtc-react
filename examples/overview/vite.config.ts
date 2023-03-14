import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import uno from "unocss/vite";
import presetUno from "unocss/preset-uno";
import presetIcons from "unocss/preset-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uno({
      presets: [presetUno(), presetIcons({ cdn: "https://esm.sh/" })],
    }),
    react(),
  ],
  envPrefix: "AGORA_",
});
