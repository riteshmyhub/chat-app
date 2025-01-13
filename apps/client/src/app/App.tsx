import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import AppRoutes from "@/routes/routes";
import { SplashScreen } from "@/shared/components";
import { useMediaQuery } from "@/shared/hooks";
import { useEffect } from "react";
import { useLocation } from "react-router";
import NavigationMenu from "./chat/partials/NavigationMenu";

export default function App() {
   const dispatch = useAppDispatch();
   const screen = useMediaQuery();
   const { pathname } = useLocation();
   const { session, accessToken, deviceToken } = useAppSelector((state) => state.authReducer);

   useEffect(() => {
      dispatch(authService.deviceToken.api());
      return () => {};
   }, []);

   useEffect(() => {
      if (accessToken) dispatch(authService.session.api());
      return () => {};
   }, [accessToken]);

   if (deviceToken.isLoading) {
      return "initializing app...";
   }
   if (session.isLoading && accessToken) {
      return <SplashScreen />;
   }
   const condtions = [
      pathname.includes("auth"), //
      pathname.split("/")[2] && !screen.md, //
   ];
   if (condtions.some((condtion) => condtion)) {
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
