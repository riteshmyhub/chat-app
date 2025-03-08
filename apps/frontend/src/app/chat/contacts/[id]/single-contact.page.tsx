import { AsideMenu, Header } from "@/shared/components";
import { useEffect, useRef } from "react";
import MessagesPage from "../../messages/messages.page";
import ContectDetails from "./partials/ContectDetails";
import { Skeleton } from "@/shared/ui/skeleton";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { chatActions, chatService } from "@/api/services/chat.service";
import { messageService } from "@/api/services/message.service";
import NotFoundPage from "@/app/404/not-found.page";

export default function SingleContactPage() {
   const asideRef = useRef<any>(null);
   const { id } = useParams();
   const { chatDetails, onlineUsers } = useAppSelector((state) => state.chatReducer);
   const { message } = useAppSelector((state) => state.messageReducer);
   const dispatch = useAppDispatch();
   const toggleAside = () => {
      asideRef.current?.setToggle((prev: boolean) => !prev);
   };
   useEffect(() => {
      if (id) {
         dispatch(chatService.getChatDetails.api(id));
         dispatch(messageService.getMessages.api(id));
      }
      return () => {
         dispatch(chatActions.clearChatDetails());
      };
   }, [id]);

   //loading
   if (chatDetails.isLoading || message.isLoading) {
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
   if (!chatDetails.data) {
      return <NotFoundPage />;
   }
   //ui
   const isOnline = chatDetails?.data?.members?.every((member) => onlineUsers.includes(member?._id));
   return (
      <AsideMenu ref={asideRef} position="right" aside={<ContectDetails chatDetails={chatDetails?.data} />}>
         <Header //
            title={chatDetails.data?.name}
            event={toggleAside}
            back="/contacts"
            avatar={chatDetails.data?.avatar}
            description={
               isOnline ? ( //
                  <p className="text-green-500 font-semibold text-xs">online</p>
               ) : (
                  <p className="text-gray-400 font-semibold text-xs">offline</p>
               )
            }
            showAvatar
         />
         <MessagesPage chatDetails={chatDetails.data} />
      </AsideMenu>
   );
}
