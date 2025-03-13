import { authService } from "@/api/services/auth.service";
import { channelService } from "@/api/services/channel.service";
import { contactService } from "@/api/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import AppRoutes from "@/app/routes";
import { SplashScreen, TabNavigation } from "@/shared/components";
import { useMediaQuery } from "@/shared/hooks";
import { useEffect } from "react";
import { useLocation } from "react-router";

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
      if (accessToken) {
         dispatch(authService.session.api());
         dispatch(contactService.getContacts.api());
         dispatch(channelService.getChannels.api());
      }
      return () => {};
   }, [accessToken]);

   if (deviceToken.isLoading) {
      return "initializing app...";
   }
   if (session.isLoading && accessToken) {
      return <SplashScreen />;
   }
   const paths = [
      "/auth", //
      "/chat/contacts/",
      "/chat/channels/",
      "/account/profile",
      "/account/app-info",
      "/employee/workspaces",
      "/employee/attendance",
      "/employee/leave",
      `/workspaces/${pathname.split("/")[2]}/features`,
      `/workspaces/${pathname.split("/")[2]}/sprints`,
      `/workspaces/${pathname.split("/")[2]}/stories`
   ];

   if (paths.find((path) => pathname.includes(path) && (pathname.includes("auth") || !screen.md))) {
      return <AppRoutes />;
   }

   return (
      <div className="flex md:flex-row flex-col-reverse">
         <TabNavigation />
         <div className="h-[calc(100vh-75px)] md:h-screen w-full">
            <AppRoutes />
         </div>
      </div>
   );
}
