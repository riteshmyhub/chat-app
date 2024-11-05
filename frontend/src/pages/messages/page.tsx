import { ScrollArea } from "@/ui/scroll-area";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Message from "./partials/Message";
import ChatForm from "./partials/ChatForm";
import React, { useEffect, useRef } from "react";
import { chatActions, chatService } from "@/store/services/chat.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Skeleton } from "@/ui/skeleton";
import { AsideMenu } from "@/components";
import ChannelDetailsPage from "../channels/channel-details/page";
import ContactDetailsPage from "../chats/contact-details/page";

export default function MessagesPage() {
   const { chatID } = useParams();
   const navigate = useNavigate();
   const scrollRef = useRef<any>(null);
   const asideMenuRef = useRef<any>(null);

   const dispatch = useAppDispatch();
   const { loadings, chatDetails, messages, onlineUsers, typing } = useAppSelector((state) => state.chat);
   const { authUser } = useAppSelector((state) => state.auth);

   useEffect(() => {
      if (chatID) {
         dispatch(chatService.getChatDetails.api(chatID));
         dispatch(chatService.getMessages.api(chatID));
      }
      return () => {
         dispatch(chatActions.clearChatDetails());
      };
   }, [chatID]);

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      return () => {};
   }, [scrollRef.current, messages]);

   if (loadings.getChatDetails || loadings.getMessages) {
      return (
         <div className="space-y-4">
            {/* Header Skeleton */}
            <Skeleton className="h-16 w-full" />

            {/* Messages Skeleton */}
            <div className="space-y-4 h-[calc(100vh-10rem)] overflow-y-auto p-3">
               {/* Incoming Message Skeleton */}
               <div className="flex items-start space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="h-28 w-3/4 rounded-lg" />
               </div>

               {/* Outgoing Message Skeleton */}
               <div className="flex justify-end">
                  <Skeleton className="h-28 w-2/3 rounded-lg" />
               </div>

               {/* Additional Message Bubbles */}
               <div className="flex items-start space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="h-28 w-3/4 rounded-lg" />
               </div>

               <div className="flex justify-end">
                  <Skeleton className="h-28 w-2/3 rounded-lg" />
               </div>
            </div>

            {/* Input Skeleton */}
            <Skeleton className="h-16 w-full mt-4" />
         </div>
      );
   }
   if (!chatDetails) {
      return <p>no chat</p>;
   }

   const isOnline = chatDetails?.members.every((member) => onlineUsers.includes(member?._id));

   return (
      <AsideMenu
         ref={asideMenuRef}
         aside={
            chatDetails.groupChat ? ( //
               <ChannelDetailsPage chatDetails={chatDetails} />
            ) : (
               <ContactDetailsPage chatDetails={chatDetails} />
            )
         }
         position="right">
         {/*  header */}
         <div className="flex items-center gap-4 p-2 bg-white border-b w-full">
            <ArrowLeftIcon onClick={() => navigate(-1)} />
            <img src={chatDetails?.avatar || "/images/group-chat-placeholder.png"} alt="avatar" height={50} width={50} className="h-14 w-14 object-cover rounded-full" />
            <div>
               <b role="button" onClick={() => asideMenuRef.current?.setToggle(true)} className="text-xl">
                  {chatDetails?.name}
               </b>
               {typing?.text && typing.chatID === chatDetails._id ? (
                  <React.Fragment>
                     <p className="text-xs">{typing.text}</p>
                  </React.Fragment>
               ) : (
                  <React.Fragment>
                     {chatDetails?.groupChat ? (
                        <React.Fragment>
                           <p className="text-xs">{chatDetails?.members.map((member) => `${member.profile.first_name} ${member.profile.last_name}`).join(" , ")}</p>
                        </React.Fragment>
                     ) : (
                        <React.Fragment>
                           {isOnline ? ( //
                              <span className="text-xs block text-green-500 font-semibold">online</span>
                           ) : (
                              <span className="text-xs block text-gray-400 font-semibold">offline</span>
                           )}
                        </React.Fragment>
                     )}
                  </React.Fragment>
               )}
            </div>
         </div>
         {/*  chat box */}
         <ScrollArea //
            className="bg-gray-100 px-3 overflow-y-auto"
            style={{ height: "calc(100vh - (73px + 72.8px))" }}>
            {messages.map((message, idx) => (
               <Message //
                  key={`message-${idx}`}
                  me={authUser?._id === message?.sender._id}
                  message={message}
                  isGroupChat={Boolean(chatDetails?.groupChat)}
               />
            ))}
            <div ref={scrollRef} />
         </ScrollArea>
         {/* form */}
         <ChatForm chatDetails={chatDetails} />
      </AsideMenu>
   );
}
