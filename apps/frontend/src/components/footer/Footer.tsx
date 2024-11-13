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
         return `px-5 py-2 rounded-2xl ${location.pathname.includes(pathname) ? "bg-green-600 text-white" : "bg-white"}`;
      },
      [location.pathname]
   );

   return (
      <ul className="flex justify-evenly items-center bg-white h-[60px] border-t">
         <Link to="/contacts" className="flex flex-col items-center">
            <span //
               className={activeStyle("/contacts")}
               {...(Boolean(messages?.length) ? { "data-badge": messages?.length } : {})}>
               <MessagesSquareIcon size={17} className="mx-auto" />
            </span>
            <small>contacts</small>
         </Link>
         <Link to="/channels" className="flex flex-col items-center">
            <span //
               className={activeStyle("/channels")}
               {...(Boolean(groupsMessages?.length) ? { "data-badge": groupsMessages?.length } : {})}>
               <UsersRoundIcon size={17} className="mx-auto" />
            </span>
            <small>channels</small>
         </Link>
         <Link to="/notifications" className="flex flex-col items-center">
            <span //
               className={activeStyle("/notifications")}
               data-badge="3">
               <BellIcon size={17} className="mx-auto" />
            </span>
            <small>notifications</small>
         </Link>
         <Link to="/settings" className="flex flex-col items-center">
            <span //
               className={activeStyle("/settings")}>
               <SettingsIcon size={17} className="mx-auto" />
            </span>
            <small>settings</small>
         </Link>
      </ul>
   );
}
