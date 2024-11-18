import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      VitePWA({
         registerType: "prompt",
         injectRegister: false,

         pwaAssets: {
            disabled: false,
            config: true,
         },

         manifest: {
            name: "we conjoin",
            short_name: "we conjoin",
            description: "workspace chat app",
            theme_color: "#ffffff",
            start_url: ".",
            display: "standalone",
         },

         workbox: {
            globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
            cleanupOutdatedCaches: true,
            clientsClaim: true,
         },

         devOptions: {
            enabled: false,
            navigateFallback: "index.html",
            suppressWarnings: true,
            type: "module",
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
