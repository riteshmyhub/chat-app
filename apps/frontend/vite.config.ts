import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), VitePWA({ registerType: "autoUpdate" })],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   server: {
      port: 3000,
      proxy: {
         "/api/v1": {
            target: "http://localhost:8000",
            changeOrigin: true,
         },
      },
   },
   preview: {
      port: 3000,
   },
});
