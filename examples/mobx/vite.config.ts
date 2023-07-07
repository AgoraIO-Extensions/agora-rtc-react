import react from "@vitejs/plugin-react";
import presetIcons from "unocss/preset-icons";
import uno from "unocss/vite";
import { defineConfig } from "vite";
import { viteExternalsPlugin } from "vite-plugin-externals";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    uno({ presets: [presetIcons()] }),
    viteExternalsPlugin({
      "react": "React",
      "react-dom": "ReactDOM",
      "react-dom/client": "ReactDOM",
      "agora-rtc-sdk-ng": "AgoraRTC",
      "agora-rtc-react": "AgoraRTCReact",
    }),
  ],
  envPrefix: "AGORA_",
});
