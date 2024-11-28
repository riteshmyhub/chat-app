import { createRoot } from "react-dom/client";
import "./assets/styles/style.css";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
);
