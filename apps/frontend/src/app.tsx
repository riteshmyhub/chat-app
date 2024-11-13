import { useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";
import AppRoutes from "./routes/routes";

function App() {
   const { pathname } = useLocation();
   const pages = ["auth", "chat"];

   if (pathname.split("/")?.some((path) => pages.includes(path)) && pathname.split("/")[2]) {
      return <AppRoutes />;
   }
   return (
      <>
         <Navbar //
            title={<span className="text-3xl capitalize">{pathname.split("/")[1]}</span>}
            {...(pathname.includes("/contacts") ? {} : { back: -1 })}
         />
         <div style={{ height: "calc(100vh - (65px + 60px))" }}>
            <AppRoutes />
         </div>
         <Footer />
      </>
   );
}

export default App;
