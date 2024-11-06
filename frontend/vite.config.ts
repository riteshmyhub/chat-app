import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
   plugins: [
      react({
         include: "**/*.ts",
         exclude: "**/*.tsx",
      }),
      VitePWA({ registerType: "autoUpdate" }),
   ],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   build: {
      outDir: "../backend/dist/views",
   },
   server: {
      port: 3000,
   },
   preview: {
      port: 3000,
   },
});
