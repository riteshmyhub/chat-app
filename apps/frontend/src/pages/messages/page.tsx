import { useAppDispatch, useAppSelector } from "@/store/store";
import ChatForm from "./partials/ChatForm";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/ui/scroll-area";
import Message from "./partials/Message";
import { useNavigate, useParams } from "react-router-dom";
import { chatActions, chatService } from "@/store/services/chat.service";
import { AsideMenu } from "@/components";
import ContactDetailsPage from "../contacts/contact-details/page";
import ChannelDetailsPage from "../channels/channel-details/page";
import { Skeleton } from "@/ui/skeleton";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";

export default function MessagesPage() {
   const { id } = useParams();
   const scrollRef = useRef<any>(null);
   const { loadings, messages, chatDetails, onlineUsers, typing } = useAppSelector((state) => state.chat);
   const { authUser } = useAppSelector((state) => state.auth);
   const asideRef = useRef<any>(null);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      return () => {};
   }, [scrollRef.current, messages]);

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
      return (
         <div className="h-screen p-3">
            <Alert variant="destructive" className="bg-white">
               <AlertCircleIcon className="h-4 w-4" />
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>Chat not found! It may have been deleted </AlertDescription>
            </Alert>
         </div>
      );
   }
   const isOnline = chatDetails?.members.every((member) => onlineUsers.includes(member?._id));

   return (
      <>
         <AsideMenu
            ref={asideRef}
            aside={
               chatDetails?.groupChat ? ( //
                  <ChannelDetailsPage chatDetails={chatDetails} />
               ) : (
                  <ContactDetailsPage chatDetails={chatDetails} />
               )
            }
            position="right">
            <div className="flex items-center gap-4 p-2 bg-white border-b w-full">
               <ArrowLeftIcon onClick={() => navigate(-1)} />
               <img //
                  src={chatDetails?.avatar || "/images/group-chat-placeholder.png"}
                  alt="avatar"
                  height={50}
                  width={50}
                  className="h-14 w-14 object-cover rounded-full"
               />
               <div>
                  <b role="button" onClick={() => asideRef.current?.setToggle((prev: boolean) => !prev)} className="text-xl">
                     {chatDetails?.name}
                  </b>
                  {typing ? "" : ""}
                  {chatDetails?.groupChat ? (
                     <p className="text-xs">{chatDetails?.members.map((member) => `${member.profile.first_name} ${member.profile.last_name}`).join(" , ")}</p>
                  ) : (
                     <span className="text-xs block font-semibold">
                        {isOnline ? ( //
                           <span className="text-green-500">online</span>
                        ) : (
                           <span className="text-gray-400">offline</span>
                        )}
                     </span>
                  )}
               </div>
            </div>
            <ScrollArea //
               className="bg-gray-100 px-3 overflow-y-auto"
               style={{ height: "calc(100vh - (77px + 72.8px))" }}>
               {messages.map((message, idx) => (
                  <Message //
                     key={`message-${idx}`}
                     me={authUser?._id === message?.sender._id}
                     message={message}
                     isGroupChat={chatDetails.groupChat}
                  />
               ))}
               <div ref={scrollRef} />
            </ScrollArea>
            <ChatForm chatDetails={chatDetails} />
         </AsideMenu>
      </>
   );
}
