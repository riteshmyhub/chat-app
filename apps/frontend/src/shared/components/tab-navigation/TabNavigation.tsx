import { useMediaQuery } from "@/shared/hooks";
import {  BriefcaseBusinessIcon, MessagesSquareIcon, SettingsIcon, UsersRoundIcon } from "lucide-react";
import { useCallback } from "react";
import { Link, useLocation } from "react-router";
import { useAppSelector } from "@/api/store";
import { AvatarProfile } from "..";

export function TabNavigation() {
   const location = useLocation();
   const screen = useMediaQuery();
   const { session } = useAppSelector((state) => state.authReducer);
   const { unreadMessages } = useAppSelector((state) => state.messageReducer);
   const groupsMessages = unreadMessages?.filter((message) => message.isChannel);
   const userMessages = unreadMessages?.filter((message) => !message.isChannel);

   const activeStyle = useCallback(
      (pathname: string) => {
         return `px-5 py-2 rounded-2xl ${location.pathname.includes(pathname) ? "bg-green-600 text-white" : "bg-white"}`;
      },
      [location.pathname]
   );
   return (
      <ul className={screen.md ? "flex flex-col justify-start gap-5 border-r w-[90px] py-4" : "flex flex-row justify-evenly gap-3 h-[75px] border-t items-center"}>
         <Link to="/settings/profile" className="hidden flex-col items-center md:flex">
            <AvatarProfile //
               src={session.data?.profile?.avatar}
               fallBackTxt={`${session.data?.profile?.first_name} ${session.data?.profile?.last_name}`}
               height="60px"
               width="60px"
            />
         </Link>
         <Link to="/workspaces" className="flex flex-col items-center">
            <span className={activeStyle("/workspaces")}>
               <BriefcaseBusinessIcon size={20} className="mx-auto" />
            </span>
            <small className="text-xs">workspaces</small>
         </Link>
         <Link to="/contacts" className="flex flex-col items-center">
            <span
               className={activeStyle("/contacts")} //
               {...(Boolean(userMessages?.length) ? { "data-badge": userMessages?.length } : {})}>
               <MessagesSquareIcon size={20} className="mx-auto" />
            </span>
            <small className="text-xs">chat</small>
         </Link>
         <Link to="/channels" className="flex flex-col items-center">
            <span //
               className={activeStyle("/channels")}
               {...(Boolean(groupsMessages?.length) ? { "data-badge": groupsMessages?.length } : {})}>
               <UsersRoundIcon size={20} className="mx-auto" />
            </span>
            <small className="text-xs">channels</small>
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
