import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { NavigationMenu } from "./components";

function App() {
   const { pathname } = useLocation();
   const pages = ["auth"];

   if (pages.some((page) => pathname.includes(page))) {
      return <AppRoutes />;
   }
   return (
      <div className="flex md:flex-row flex-col-reverse">
         <NavigationMenu />
         <div className="h-[calc(100vh-75px)] md:h-screen w-full">
            <AppRoutes />
         </div>
      </div>
   );
}

export default App;
