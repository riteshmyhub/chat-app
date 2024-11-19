import { AsideMenu, ChatMessages, Navbar, SendMessage } from "@/components";
import { chatActions, chatService } from "@/store/services/chat.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Skeleton } from "@/ui/skeleton";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChannelDetailsPage from "./partials/ChannelDetails";

export default function SingleChannelPage() {
   const asideRef = useRef<any>(null);
   const { id } = useParams();
   const { loadings, chatDetails, messages, typing } = useAppSelector((state) => state.chat);
   const dispatch = useAppDispatch();

   const toggleAside = () => {
      asideRef.current?.setToggle((prev: boolean) => !prev);
   };

   useEffect(() => {
      if (id) {
         dispatch(chatService.getChatDetails.api(id));
         dispatch(chatService.getMessages.api(id));
      }
      return () => {
         dispatch(chatActions.clearChatDetails());
      };
   }, [id]);

   if (loadings.getChatDetails || loadings.getMessages) {
      return (
         <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <div className="space-y-4 h-[calc(100vh-10rem)] overflow-y-auto p-3">
               <div className="flex items-start space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="h-28 w-3/4 rounded-lg" />
               </div>
               <div className="flex justify-end">
                  <Skeleton className="h-28 w-2/3 rounded-lg" />
               </div>
               <div className="flex items-start space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="h-28 w-3/4 rounded-lg" />
               </div>

               <div className="flex justify-end">
                  <Skeleton className="h-28 w-2/3 rounded-lg" />
               </div>
            </div>
            <Skeleton className="h-16 w-full mt-4" />
         </div>
      );
   }
   if (!chatDetails) {
      return "no chat";
   }

   return (
      <AsideMenu ref={asideRef} position="right" aside={<ChannelDetailsPage chatDetails={chatDetails} />}>
         <Navbar //
            avatar={chatDetails?.avatar || "/images/group-chat-placeholder.png"}
            title={<b onClick={toggleAside}>{chatDetails.name}</b>}
            description={
               <>
                  <p className="text-xs">
                     {typing //
                        ? typing
                        : chatDetails?.members.map((member) => `${member.profile.first_name} ${member.profile.last_name}`).join(" , ")}
                  </p>
               </>
            }
            back={"/channels"}
         />
         <ChatMessages messages={messages} />
         <SendMessage chatDetails={chatDetails} />
      </AsideMenu>
   );
}
