import { ScrollArea } from "@/ui/scroll-area";
import Message from "../message/message";
import { IMessage } from "@/types/chat.type";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/store";
import moment from "moment";
import { Badge } from "@/ui/badge";
import { useSocket } from "@/hooks/socket/useSocket.hook";

type MessageContainerProps = {
   messages: IMessage[];
};

export function ChatMessages({ messages }: MessageContainerProps) {
   const { authUser } = useAppSelector((state) => state.auth);
   const { chatDetails } = useAppSelector((state) => state.chat);
   const scrollRef = useRef<HTMLDivElement | null>(null);
   const { socket } = useSocket();

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }

      if (!chatDetails?.groupChat) {
         socket.emit("MARK_AS_READ", chatDetails?._id);
      }
      return () => {};
   }, [messages, chatDetails]);

   let lastDate: null | string = null;

   return (
      <ScrollArea className="overflow-y-auto flex-1 bg-[#F3F4F6] px-3">
         {messages.map((message, idx) => {
            const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;

            const isToday = moment(message.createdAt).isSame(new Date(), "day");
            const isYesterday = moment(message.createdAt).isSame(moment().subtract(1, "day"), "day");

            return (
               <React.Fragment key={`fragment-${idx}`}>
                  {showDate && (
                     <div className="text-center py-3" key={`date-${messageDate}`}>
                        <Badge variant="outline" className="bg-white">
                           {isToday ? "Today" : isYesterday ? "Yesterday" : moment(message.createdAt).format("LL")}
                        </Badge>
                     </div>
                  )}
                  <Message //
                     key={`message-${message.chat}`}
                     me={authUser?._id === message?.from}
                     message={message}
                     isChannel={message.isChannel}
                     members={chatDetails?.members}
                  />
               </React.Fragment>
            );
         })}
         <div ref={scrollRef} />
      </ScrollArea>
   );
}
