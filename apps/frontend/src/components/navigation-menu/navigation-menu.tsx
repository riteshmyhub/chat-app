import { Link, useLocation } from "react-router-dom";
import { BellIcon, MessagesSquareIcon, SettingsIcon, UsersRoundIcon } from "lucide-react";
import { useAppSelector } from "@/store/store";
import { useCallback } from "react";
import { useMediaQuery } from "@/hooks";

export function NavigationMenu() {
   const { unreadMessages } = useAppSelector((state) => state.chat);
   const { authUser } = useAppSelector((state) => state.auth);
   const groupsMessages = unreadMessages?.filter((message) => message.groupChat);
   const messages = unreadMessages?.filter((message) => !message.groupChat);
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
         <Link to="/settings/profile" className="hidden flex-col items-center md:flex">
            <img src={authUser?.profile?.avatar} alt="avatar" className="w-[60px] h-[60px] rounded-full border-2 object-cover" />
         </Link>
         <Link to="/contacts" className="flex flex-col items-center">
            <span //
               className={activeStyle("/contacts")}
               {...(Boolean(messages?.length) ? { "data-badge": messages?.length } : {})}>
               <MessagesSquareIcon size={20} className="mx-auto" />
            </span>
            <small className="text-xs">contacts</small>
         </Link>
         <Link to="/channels" className="flex flex-col items-center">
            <span //
               className={activeStyle("/channels")}
               {...(Boolean(groupsMessages?.length) ? { "data-badge": groupsMessages?.length } : {})}>
               <UsersRoundIcon size={20} className="mx-auto" />
            </span>
            <small className="text-xs">channels</small>
         </Link>
         <Link to="/notifications" className="flex flex-col items-center">
            <span //
               className={activeStyle("/notifications")}
               data-badge="3">
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
