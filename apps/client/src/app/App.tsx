import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import AppRoutes from "@/routes/routes";
import { SplashScreen } from "@/shared/components";
import { useEffect } from "react";

export default function App() {
   const dispatch = useAppDispatch();
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

   return <AppRoutes />;
}
