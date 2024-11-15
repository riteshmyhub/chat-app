import { BellIcon, CircleUserRoundIcon, LoaderCircle, LogOutIcon, MessageCircleIcon } from "lucide-react";
import useLogoutPage from "../auth/logout/logout.page";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks";
import { Navbar } from "@/components";

const SettingsMenu = () => {
   const logout = useLogoutPage();
   const navigate = useNavigate();
   return (
      <div className="p-3 md:p-8">
         <h1 className="text-4xl mb-4">Settings</h1>
         <ul className="md:w-[450px]">
            <li //
               className="flex items-center gap-3 py-3 md:py-3"
               onClick={() => navigate("profile")}
               role="button">
               <CircleUserRoundIcon size={23} />
               <span className="block text-lg font-medium capitalize">profile</span>
            </li>
            <li //
               className="flex items-center gap-3 py-3 md:py-3"
               onClick={() => navigate("chat")}
               role="button">
               <MessageCircleIcon size={23} />
               <span className="block text-lg font-medium capitalize">chat</span>
            </li>
            <li //
               className="flex items-center gap-3 py-3 md:py-3"
               onClick={() => navigate("sounds")}
               role="button">
               <BellIcon size={23} />
               <span className="block text-lg font-medium capitalize">sounds Settings</span>
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
               <span className="block text-lg font-medium capitalize">Logout</span>
            </li>
         </ul>
      </div>
   );
};
export default function SettingsPage() {
   const screen = useMediaQuery();
   const { pathname } = useLocation();

   if (screen.md) {
      return (
         <div className="flex h-full">
            <aside className="md:block w-[350px] border-r border-gray-300">
               <SettingsMenu />
            </aside>
            <main className="flex-1 h-full">
               <Navbar title={<span className="text-xl capitalize font-medium">{pathname.split("/")[2]}</span>} />
               <Outlet />
            </main>
         </div>
      );
   }
   return (
      <div>
         {pathname?.split("/")[2] ? ( //
            <div>
               <Navbar title={<span className="text-xl capitalize font-medium">{pathname.split("/")[2]}</span>} back="/settings" />
               <Outlet />
            </div>
         ) : (
            <SettingsMenu />
         )}
      </div>
   );
}
