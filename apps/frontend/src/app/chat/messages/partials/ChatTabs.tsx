import { useAppSelector } from "@/api/store";
import { Button } from "@/shared/ui/button";
import { useLocation, useNavigate } from "react-router";

export default function ChatTabs() {
   const { pathname } = useLocation();
   const navigate = useNavigate();
   const { unreadMessages } = useAppSelector((state) => state.messageReducer);
   const channelMessages = unreadMessages?.filter((message) => !message?.isChannel)?.length;
   const userMessages = unreadMessages?.filter((message) => message?.isChannel)?.length;

   return (
      <div className="flex gap-1 my-3">
         <Button //
            {...(Boolean(userMessages) ? { "data-badge": userMessages } : {})}
            onClick={() => navigate("/chat/contacts")}
            variant={pathname.includes("contacts") ? "theme" : "outline"}
            className={`w-[50%] rounded-none`}>
            Contacts
         </Button>
         <Button //
            {...(Boolean(channelMessages) ? { "data-badge": channelMessages } : {})}
            onClick={() => navigate("/chat/channels")}
            variant={pathname.includes("channels") ? "theme" : "outline"}
            className={`w-[50%] rounded-none`}>
            Channels
         </Button>
      </div>
   );
}
