import ChannelDetails from "./partials/ChannelDetails";
import { AsideMenu, Header } from "@/shared/components";
import { useEffect, useRef } from "react";
import MessagesPage from "../../messages/messages.page";
import { Skeleton } from "@/shared/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { useParams } from "react-router";
import { chatActions, chatService } from "@/api/services/chat.service";
import { messageService } from "@/api/services/message.service";

export default function SingleChannelPage() {
   const { id } = useParams();
   const asideRef = useRef<any>(null);
   const scrollRef = useRef<HTMLDivElement | null>(null);
   const dispatch = useAppDispatch();
   const { chatDetails } = useAppSelector((state) => state.chatReducer);
   const { message } = useAppSelector((state) => state.messageReducer);

   const toggleAside = () => {
      asideRef.current?.setToggle((prev: boolean) => !prev);
   };

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return () => {};
   }, []);

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
      return <div>no data</div>;
   }
   //ui
   const members = chatDetails?.data?.members;
   const limit = 3;
   const showMembers = members?.length > limit ? members?.slice(0, limit) : members;
   const remaining = members?.length > limit ? ` + ${members?.length - limit} more` : "";
   return (
      <AsideMenu //
         ref={asideRef}
         position="right"
         aside={<ChannelDetails chatDetails={chatDetails?.data} />}>
         <Header //
            title={chatDetails?.data?.name}
            event={toggleAside}
            back="/chat"
            avatar={chatDetails?.data?.avatar}
            description={
               <p className="text-xs">
                  {showMembers
                     ?.map(({ profile }) => {
                        return `${profile?.first_name}`;
                     })
                     .join(" ,")
                     .concat(remaining)}
               </p>
            }
            showAvatar
         />
         <MessagesPage chatDetails={chatDetails?.data} />
      </AsideMenu>
   );
}
