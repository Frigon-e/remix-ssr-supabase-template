/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vite'
import { vitePlugin as remix } from "@remix-run/dev";
import path from 'path';
import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

// https://vite.dev/config/
export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  // per https://github.com/aws-amplify/amplify-js/issues/9639#issuecomment-1081781840
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'),
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    host: true,
    port: 3000,
  },

  define: {
    "process.env": process.env,
  },
})
