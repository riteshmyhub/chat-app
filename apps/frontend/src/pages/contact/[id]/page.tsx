import { AsideMenu, ChatMessages, Navbar, SendMessage } from "@/components";
import { chatActions, chatService } from "@/store/services/chat.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Skeleton } from "@/ui/skeleton";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ContactDetailsPage from "./partials/ContactDetails";

export default function SingleContactPage() {
   const asideRef = useRef<any>(null);
   const { id } = useParams();
   const { loadings, chatDetails, messages, typing, onlineUsers } = useAppSelector((state) => state.chat);
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

   if (loadings.getChatDetails) {
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
   const isOnline = chatDetails?.members.every((member) => onlineUsers.includes(member?._id));
   return (
      <AsideMenu ref={asideRef} position="right" aside={<ContactDetailsPage chatDetails={chatDetails} />}>
         <Navbar //
            avatar={chatDetails?.avatar || "/images/group-chat-placeholder.png"}
            title={<b onClick={toggleAside}>{chatDetails.name}</b>}
            description={
               <>
                  <p className="text-xs">
                     {typing ? ( //
                        typing
                     ) : isOnline ? ( //
                        <span className="text-green-500 font-semibold">online</span>
                     ) : (
                        <span className="text-gray-400 font-semibold">offline</span>
                     )}
                  </p>
               </>
            }
            back={"/contacts"}
         />
         <ChatMessages messages={messages} />
         <SendMessage chatDetails={chatDetails} />
      </AsideMenu>
   );
}
