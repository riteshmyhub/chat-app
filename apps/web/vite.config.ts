import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
   plugins: [
      react(),
      VitePWA({
         registerType: "autoUpdate",
         workbox: {
            clientsClaim: true,
            skipWaiting: true,
         },
         manifest: {
            name: "Your App Name",
            short_name: "App",
            description: "Your app description",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            display: "standalone",
            icons: [
               {
                  src: "/icons/icon-192x192.png",
                  sizes: "192x192",
                  type: "image/png",
               },
               {
                  src: "/icons/icon-512x512.png",
                  sizes: "512x512",
                  type: "image/png",
               },
               {
                  src: "/icons/icon-512x512-maskable.png",
                  sizes: "512x512",
                  type: "image/png",
                  purpose: "maskable",
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
   },
});
