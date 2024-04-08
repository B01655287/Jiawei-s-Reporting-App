import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import fs from "fs";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
      manifest: {
        theme_color: "#f69435",
        background_color: "#f69435",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "Jiawei's Reporting App",
        description: "React App",
        name: "React",
        icons: [
          {
            src: "/logo.jpg",
            sizes: "192x192",
            type: "image/jpg",
          },
          {
            src: "/logo.jpg",
            sizes: "256x256",
            type: "image/jpg",
          },
          {
            src: "/logo.jpg",
            sizes: "384x384",
            type: "image/jpg",
          },
          {
            src: "/logo.jpg",
            sizes: "512x512",
            type: "image/jpg",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
