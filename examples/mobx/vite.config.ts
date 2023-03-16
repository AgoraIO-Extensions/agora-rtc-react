import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envPrefix = "AGORA_";
  const localEnv = loadEnv(mode, __dirname, envPrefix);
  const rootEnv = loadEnv(mode, path.join(__dirname, "..", ".."), envPrefix);
  const mergedEnv = Object.entries({ ...rootEnv, ...localEnv }).reduce(
    (o, [k, v]) => ((o[`import.meta.env.${k}`] = JSON.stringify(v)), o),
    {},
  );
  return {
    define: mergedEnv,
    plugins: [react()],
    envPrefix,
  };
});
