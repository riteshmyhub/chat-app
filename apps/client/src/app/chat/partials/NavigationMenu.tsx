import { useMediaQuery } from "@/shared/hooks";
import { BellIcon, MessagesSquareIcon, SettingsIcon, UsersRoundIcon } from "lucide-react";
import { useCallback } from "react";
import { Link, useLocation } from "react-router";

export default function NavigationMenu() {
   const location = useLocation();
   const screen = useMediaQuery();

   const activeStyle = useCallback(
      (pathname: string) => {
         return `px-5 py-2 rounded-2xl ${location.pathname.includes(pathname) ? "bg-green-600 text-white" : "bg-white"}`;
      },
      [location.pathname]
   );
   return (
      <ul className={screen.md ? "flex flex-col justify-start gap-5 border-r w-[90px] py-4" : "flex flex-row justify-evenly gap-3 h-[75px] border-t items-center"}>
         <Link to="/chat/contacts" className="flex flex-col items-center">
            <span className={activeStyle("/chat/contacts")}>
               <MessagesSquareIcon size={20} className="mx-auto" />
            </span>
            <small className="text-xs">contacts</small>
         </Link>
         <Link to="/chat/channels" className="flex flex-col items-center">
            <span className={activeStyle("/chat/channels")}>
               <UsersRoundIcon size={20} className="mx-auto" />
            </span>
            <small className="text-xs">channels</small>
         </Link>
         <Link to="/notifications" className="flex flex-col items-center">
            <span className={activeStyle("/notifications")}>
               <BellIcon size={20} className="mx-auto" />
            </span>
            <small className="text-xs">notifications</small>
         </Link>
         <Link to="/settings" className="flex flex-col items-center">
            <span //
               className={activeStyle("/settings")}>
               <SettingsIcon size={20} className="mx-auto" />
            </span>
            <small className="text-xs">settings</small>
         </Link>
      </ul>
   );
}
