import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { NavigationMenu } from "./components";
import PWABadge from "./pwa/PWABadge";
import { useMediaQuery } from "./hooks";
import { onNotification } from "./utils";

function App() {
   const { pathname } = useLocation();
   const screen = useMediaQuery();

   const condtions = [
      pathname.includes("auth"), //
      pathname.includes("channels/") && !screen.md, //
      pathname.includes("contacts/") && !screen.md,
   ];

   onNotification()
      .then((data) => {
         console.log(data);
      })
      .catch((e) => e);

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
