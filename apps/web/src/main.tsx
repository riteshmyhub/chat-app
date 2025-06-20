import { createRoot } from "react-dom/client";
import "./assets/styles/style.css";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router";
import { ReduxProvider } from "./api/store.tsx";
import { SocketProvider } from "./api/socket/socket.tsx";
import { Toaster as ReactHotToast } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
   <ReduxProvider>
      <BrowserRouter>
         <SocketProvider>
            <App />
            <ReactHotToast />
         </SocketProvider>
      </BrowserRouter>
   </ReduxProvider>
);
