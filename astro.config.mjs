// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 9999,
    allowedHosts: ["demo.widyakumara.com"],
  },

  devToolbar: {
    enabled: false,
  },

  outDir: "./.dist",

  build: {
    inlineStylesheets: "never",
    format: "file",
    assets: "inc",
  },

  vite: {
    plugins: [tailwindcss()],
    esbuild: { legalComments: "none" },
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          hashCharacters: "base36",
          assetFileNames: "inc/[hash:8].[ext]",
          chunkFileNames: "inc/c[hash:7].js",
          entryFileNames: "inc/e[hash:7].js",
        },
      },
    },
  },

  adapter: cloudflare(),
});