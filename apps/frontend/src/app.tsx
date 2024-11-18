import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { NavigationMenu } from "./components";
import PWABadge from "./pwa/PWABadge";
import { useMediaQuery } from "./hooks";
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "./utils/firebase/config.firebase";

function App() {
   const { pathname } = useLocation();
   const screen = useMediaQuery();

   const condtions = [
      pathname.includes("auth"), //
      pathname.includes("channels/") && !screen.md, //
      pathname.includes("contacts/") && !screen.md,
   ];

   useEffect(() => {
      onMessage(messaging, (args) => {
         console.log(args);
      });
      return () => {};
   }, []);

   if (condtions.some((condtion) => condtion)) {
      return (
         <div className="h-screen w-full">
            <AppRoutes />
         </div>
      );
   }

   return (
      <>
         <div className="flex md:flex-row flex-col-reverse">
            <NavigationMenu />
            <div className="h-[calc(100vh-75px)] md:h-screen w-full">
               <AppRoutes />
            </div>
         </div>
         <PWABadge />
      </>
   );
}

export default App;
