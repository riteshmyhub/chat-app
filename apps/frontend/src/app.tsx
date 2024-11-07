import { Footer, Navbar } from "@/components";
import AppRoutes from "./routes/routes";
import { useLocation } from "react-router-dom";

export default function App() {
   const { pathname } = useLocation();
   const pages = ["auth", "chats", "channels"];

   if (pathname.split("/")?.some((path) => pages.includes(path)) && pathname.split("/")[2]) {
      return <AppRoutes />;
   }

   return (
      <>
         <header>
            <Navbar //
               title={<span className="text-3xl capitalize">{pathname.split("/")[1]}</span>}
               {...(pathname.includes("/chats") ? {} : { back: -1 })}
            />
         </header>
         <main style={{ height: "calc(100vh - (65px + 60px))" }}>
            <AppRoutes />
         </main>
         <footer>
            <Footer />
         </footer>
      </>
   );
}
