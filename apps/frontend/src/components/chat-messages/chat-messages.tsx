import { ScrollArea } from "@/ui/scroll-area";
import Message from "../message/message";
import { IMessage } from "@/types/chat.type";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/store";
import moment from "moment";
import { Badge } from "@/ui/badge";

type MessageContainerProps = {
   messages: IMessage[];
};

export function ChatMessages({ messages }: MessageContainerProps) {
   const { authUser } = useAppSelector((state) => state.auth);
   const scrollRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [messages]);

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
                     me={authUser?._id === message?.sender._id}
                     message={message}
                     isGroupChat={message.groupChat}
                  />
               </React.Fragment>
            );
         })}
         <div ref={scrollRef} />
      </ScrollArea>
   );
}
