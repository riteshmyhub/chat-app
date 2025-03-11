import { useAppSelector } from "@/api/store";
import { Button } from "@/shared/ui/button";
import { useLocation, useNavigate } from "react-router";

export default function ChatTabs() {
   const { pathname } = useLocation();
   const navigate = useNavigate();
   const { unreadMessages } = useAppSelector((state) => state.messageReducer);
   const channelMessages = unreadMessages?.filter((message) => message?.isChannel)?.length;
   const userMessages = unreadMessages?.filter((message) => !message?.isChannel)?.length;

   return (
      <div className="flex gap-2 my-3 px-2">
         <Button //
            size="sm"
            {...(Boolean(userMessages) ? { "data-badge": userMessages } : {})}
            onClick={() => navigate("/chat/contacts")}
            variant={pathname.includes("contacts") ? "theme" : "ghost"}
            className={`rounded-2xl text-xs font-medium px-5 h-7 ${!pathname.includes("contacts") && "border border-primary text-primary bg-white"}`}>
            Contacts
         </Button>
         <Button //
            size="sm"
            {...(Boolean(channelMessages) ? { "data-badge": channelMessages } : {})}
            onClick={() => navigate("/chat/channels")}
            variant={pathname.includes("channels") ? "theme" : "ghost"}
            className={`rounded-2xl text-xs font-medium px-5 h-7 ${!pathname.includes("channels") && "border border-primary text-primary bg-white"}`}>
            Channels
         </Button>
      </div>
   );
}
