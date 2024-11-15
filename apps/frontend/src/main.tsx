import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./app.tsx";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "./store/store.tsx";
import { SocketProvider } from "./hooks/socket/useSocket.hook.tsx";
import { Toaster as ReactHotToast } from "react-hot-toast";
import { registerSW } from "virtual:pwa-register";

createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
      <ReduxProvider>
         <SocketProvider>
            <App />
            <ReactHotToast />
         </SocketProvider>
      </ReduxProvider>
   </BrowserRouter>
);


const updateSW = registerSW({
   onNeedRefresh() {
      if (confirm("New content available! Click OK to refresh.")) {
         updateSW(true); // Forces the service worker to update
      }
   },
   onOfflineReady() {
      console.log("App is ready for offline use.");
   },
});
