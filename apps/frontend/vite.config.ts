import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      VitePWA({
         registerType: "autoUpdate",
         includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
         manifest: {
            name: "We Conjoin",
            short_name: "Vite PWA",
            theme_color: "#ffffff",
            icons: [
               {
                  src: "pwa-64x64.png",
                  sizes: "64x64",
                  type: "image/png",
               },
               {
                  src: "pwa-192x192.png",
                  sizes: "192x192",
                  type: "image/png",
               },
               {
                  src: "pwa-512x512.png",
                  sizes: "512x512",
                  type: "image/png",
                  purpose: "any",
               },
               {
                  src: "maskable-icon-512x512.png",
                  sizes: "512x512",
                  type: "image/png",
                  purpose: "maskable",
               },
               {
                  src: "pwa-1024x1024.png",
                  sizes: "1024x1024",
                  type: "image/png",
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
