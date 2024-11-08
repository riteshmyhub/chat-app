import { useAppSelector } from "@/store/store";
import ChatForm from "./partials/ChatForm";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/ui/scroll-area";
import Message from "./partials/Message";

type Props = {
   id: string;
};
export default function MessagesPage({ id }: Props) {
   const scrollRef = useRef<any>(null);
   const { messages } = useAppSelector((state) => state.chat);
   const { authUser } = useAppSelector((state) => state.auth);

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      return () => {};
   }, [scrollRef.current, messages]);

   return (
      <>
         <ScrollArea //
            className="bg-gray-100 px-3 overflow-y-auto"
            style={{ height: "calc(100vh - (77px + 72.8px))" }}>
            {messages.map((message, idx) => (
               <Message //
                  key={`message-${idx}`}
                  me={authUser?._id === message?.sender._id}
                  message={message}
                  isGroupChat={true}
               />
            ))}
            <div ref={scrollRef} />
         </ScrollArea>
         <ChatForm id={id} />
      </>
   );
}
