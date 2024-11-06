import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), VitePWA({ registerType: "autoUpdate" })],
   server: {
      port: 3000,
      proxy: {
         "/api": {
            target: "http://localhost:8000",
            changeOrigin: true,
         },
      },
   },
   preview: {
      port: 3000,
   },
});
