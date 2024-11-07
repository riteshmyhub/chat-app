import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./app.tsx";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "./store/store.tsx";

createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
      <ReduxProvider>
         <App />
      </ReduxProvider>
   </BrowserRouter>
);
