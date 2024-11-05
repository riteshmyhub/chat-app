import { Link, useLocation } from "react-router-dom";
import { BellIcon, MessagesSquareIcon, SettingsIcon, UsersRoundIcon } from "lucide-react";
import { useAppSelector } from "@/store/store";
import { useCallback } from "react";

export function Footer() {
   const { unreadMessages } = useAppSelector((state) => state.chat);
   const groupsMessages = unreadMessages?.filter((message) => message.groupChat);
   const messages = unreadMessages?.filter((message) => !message.groupChat);
   const location = useLocation();

   const activeStyle = useCallback(
      (pathname: string) => {
         return `px-4 py-1 rounded-xl ${location.pathname.includes(pathname) ? "bg-green-600 text-white" : "bg-white"}`;
      },
      [location.pathname]
   );

   return (
      <ul className="flex justify-evenly items-center bg-white h-[60px] border-t">
         <Link to="/chats" className="flex flex-col items-center">
            <span //
               className={activeStyle("/chats")}
               {...(Boolean(messages?.length) ? { "data-badge": messages?.length } : {})}>
               <MessagesSquareIcon size={20} className="mx-auto" />
            </span>
            <small>chats</small>
         </Link>
         <Link to="/channels" className="flex flex-col items-center">
            <span //
               className={activeStyle("/channels")}
               {...(Boolean(groupsMessages?.length) ? { "data-badge": groupsMessages?.length } : {})}>
               <UsersRoundIcon size={20} className="mx-auto" />
            </span>
            <small>channels</small>
         </Link>
         <Link to="/notifications" className="flex flex-col items-center">
            <span //
               className={activeStyle("/notifications")}
               data-badge="3">
               <BellIcon size={20} className="mx-auto" />
            </span>
            <small>notifications</small>
         </Link>
         <Link to="/settings" className="flex flex-col items-center">
            <span //
               className={activeStyle("/settings")}>
               <SettingsIcon size={20} className="mx-auto" />
            </span>
            <small>settings</small>
         </Link>
      </ul>
   );
}
