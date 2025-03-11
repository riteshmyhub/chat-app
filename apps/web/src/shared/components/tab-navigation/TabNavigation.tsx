import { useMediaQuery } from "@/shared/hooks";
import { CircleUserRoundIcon, MessagesSquareIcon, HomeIcon, BellDotIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAppSelector } from "@/api/store";
import { AvatarProfile } from "..";

const Tab = ({ Icon, pathname, badge, title }: { Icon: any; pathname: string; title: string; badge?: number }) => {
   const location = useLocation();

   const isActive =
      pathname === "/"
         ? location.pathname === pathname // Exact match for home
         : location.pathname.startsWith(pathname); // Starts with for other paths
   return (
      <Link
         to={pathname} //
         className="flex flex-col items-center"
         {...(badge ? { "data-badge": badge } : {})}>
         <span className={`px-5 py-2 rounded-3xl ${isActive ? "bg-primary text-secondary" : "bg-white text-gray-400"}`}>
            <Icon size={22} className="mx-auto" strokeWidth={1} />
         </span>
         <small className={`text-xs capitalize ${isActive ? "text-primary font-semibold" : "text-gray-400"}`}>{title}</small>
      </Link>
   );
};

export function TabNavigation() {
   const screen = useMediaQuery();
   const { session } = useAppSelector((state) => state.authReducer);
   const { unreadMessages } = useAppSelector((state) => state.messageReducer);

   return (
      <ul className={screen.md ? "flex flex-col justify-start gap-5 border-r w-[90px] py-4" : "flex flex-row justify-evenly gap-3 h-[75px] border-t items-center"}>
         <Link to="/" className="hidden flex-col items-center md:flex">
            <AvatarProfile src={session.data?.profile?.avatar} fallBackTxt={`${session.data?.profile?.first_name} ${session.data?.profile?.last_name}`} height="60px" width="60px" />
         </Link>
         <Tab //
            pathname="/"
            Icon={HomeIcon}
            title="home"
         />
         <Tab //
            pathname="/chat"
            Icon={MessagesSquareIcon}
            title="chats"
            badge={unreadMessages?.length}
         />
         <Tab //
            pathname="/notification"
            Icon={BellDotIcon}
            title="notification"
         />
         <Tab //
            pathname="/account"
            Icon={CircleUserRoundIcon}
            title="account"
         />
      </ul>
   );
}
