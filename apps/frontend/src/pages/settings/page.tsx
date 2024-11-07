import { BellIcon, CircleUserRoundIcon, LoaderCircle, LogOutIcon, MessageCircleIcon } from "lucide-react";
import useLogoutPage from "../auth/logout/logout.page";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks";

const SettingsMenu = () => {
   const logout = useLogoutPage();
   const navigate = useNavigate();
   return (
      <ul className="md:w-[450px] p-3 border-r">
         <li //
            className="flex items-center gap-3 py-3 md:py-3"
            onClick={() => navigate("profile")}
            role="button">
            <CircleUserRoundIcon size={23} />
            <span className="block text-md font-medium capitalize">profile</span>
         </li>
         <li //
            className="flex items-center gap-3 py-3 md:py-3"
            onClick={() => navigate("chat")}
            role="button">
            <MessageCircleIcon size={23} />
            <span className="block text-md font-medium capitalize">chat</span>
         </li>
         <li //
            className="flex items-center gap-3 py-3 md:py-3"
            onClick={() => navigate("sounds")}
            role="button">
            <BellIcon size={23} />
            <span className="block text-md font-medium capitalize">sounds Settings</span>
         </li>
         <li //
            className="flex items-center gap-3 py-3 md:py-3 text-red-600"
            role="button"
            onClick={logout.function}>
            {logout.loading ? ( //
               <LoaderCircle size={20} className="spin" />
            ) : (
               <LogOutIcon size={20} />
            )}
            <span className="block text-md font-medium capitalize">Logout</span>
         </li>
      </ul>
   );
};
export default function SettingsPage() {
   const screen = useMediaQuery();
   const { pathname } = useLocation();

   if (screen.md) {
      return (
         <div className="flex h-full">
            <SettingsMenu />
            <div className="w-full p-3">
               <Outlet />
            </div>
         </div>
      );
   }
   return (
      <div>
         {pathname.split("/")[2] ? ( //
            <Outlet />
         ) : (
            <SettingsMenu />
         )}
      </div>
   );
}
