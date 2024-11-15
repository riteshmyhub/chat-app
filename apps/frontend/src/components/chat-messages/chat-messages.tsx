import { ScrollArea } from "@/ui/scroll-area";
import Message from "../message/message";
import { IMessage } from "@/types/chat.type";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/store";

type Message = {
   text: string;
   files: File[];
   isSentByUser: boolean; // Indicates if the message is sent by the user
};

type MessageContainerProps = {
   messages: IMessage[];
};

export function ChatMessages({ messages }: MessageContainerProps) {
   const { authUser } = useAppSelector((state) => state.auth);
   const scrollRef = useRef<any>(null);

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      return () => {};
   }, [scrollRef.current, messages]);

   return (
      <ScrollArea className="overflow-y-auto flex-1 bg-gray-100">
         {messages.map((message, idx) => (
            <Message //
               key={`message-${idx}`}
               me={authUser?._id === message?.sender._id}
               message={message}
               isGroupChat={message.groupChat}
            />
         ))}
         <div ref={scrollRef} />
      </ScrollArea>
   );
}
