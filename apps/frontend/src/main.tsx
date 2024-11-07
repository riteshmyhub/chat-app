import { createRoot } from "react-dom/client";
import "./assets/styles/style.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "./store/store";
import { Toaster as ReactHotToast } from "react-hot-toast";
import { SocketProvider } from "./hooks/socket/useSocket.hook";

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

/*
I am requesting leave  to celebrate Diwali with my family, as I’ll be traveling to my hometown for the occasion.
*/
