import { defineConfig } from "tsup";

import setGlobals from "../../scripts/tsup/set-globals";

import pkg from "./package.json";

const banner = `
/**
 * @license ${pkg.name}
 * @version ${pkg.version}
 *
 * Copyright (c) Agora, Inc.
 *
 * This source code is licensed under the MIT license.
 */
`;

export default defineConfig([
  {
    entry: {
      [pkg.name]: "src/index.ts",
    },
    banner: () => {
      return {
        js: banner,
      };
    },
    format: ["cjs", "esm"],
    splitting: false,
    sourcemap: false,
    clean: true,
    treeshake: true,
    dts: {
      resolve: ["agora-rtc-sdk-ng"],
    },
    minify: true,
  },
  {
    entry: {
      [pkg.name]: "src/index.ts",
    },
    banner: () => {
      return {
        js: banner,
      };
    },
    outExtension: () => {
      return {
        js: `.iife.js`,
      };
    },
    format: ["iife"],
    sourcemap: false,
    splitting: false,
    clean: true,
    minify: true,
    external: Object.keys(pkg.peerDependencies),
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    globalName: "AgoraRTC",
    esbuildPlugins: [
      setGlobals({
        "react": "React",
        "react-dom": "ReactDOM",
      }),
    ],
    platform: "browser",
  },
]);
