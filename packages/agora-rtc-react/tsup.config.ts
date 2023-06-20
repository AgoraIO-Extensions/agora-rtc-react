import { defineConfig } from "tsup";

import setGlobals from "../../scripts/tsup/set-globals";

import pkg from "./package.json";

export default defineConfig([
  {
    entry: {
      [pkg.name]: "src/index.ts",
    },
    format: ["cjs", "esm"],
    splitting: false,
    sourcemap: false,
    clean: true,
    treeshake: true,
    dts: true,
    minify: false,
  },
  {
    entry: {
      [pkg.name]: "src/index.ts",
    },
    banner: () => {
      return {
        js: `
/**
* ${pkg.name}-v${pkg.version} Copyright AgoraInc.
*/
       `,
      };
    },
    outExtension: () => {
      return {
        js: `.v_${pkg.version}.js`,
      };
    },
    format: ["iife"],
    sourcemap: true,
    splitting: false,
    clean: true,
    minify: true,
    external: Object.keys(pkg.peerDependencies),
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    globalName: "AgoraRTCReact",
    esbuildPlugins: [
      setGlobals({
        "react": "React",
        "react-dom": "ReactDOM",
        "agora-rtc-sdk-ng": "AgoraRTC",
      }),
    ],
    platform: "browser",
  },
]);
