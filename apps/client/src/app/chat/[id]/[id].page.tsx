import { ScrollArea } from "@/shared/ui/scroll-area";
import Message from "./partials/Message";
import SendMessage from "./partials/SendMessage";
import ChannelDetails from "./partials/ChannelDetails";
import { AsideMenu, Header } from "@/shared/components";
import React, { useEffect, useRef } from "react";
import { messages } from "@/mocks/message.mock";
import { chatInfo } from "@/mocks/chat-info.mock";
import Typing from "./partials/Typing";

export default function MessagesPage() {
   const asideRef = useRef<any>(null);
   const scrollRef = useRef<HTMLDivElement | null>(null);
   const toggleAside = () => {
      asideRef.current?.setToggle((prev: boolean) => !prev);
   };

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return () => {};
   }, []);

   return (
      <AsideMenu ref={asideRef} position="right" aside={<ChannelDetails />}>
         <Header //
            title={<b onClick={toggleAside}>BE developer</b>}
            back="/chat"
            avatar="https://cdn.vectorstock.com/i/1000v/24/27/people-group-avatar-character-vector-12392427.jpg"
            description={<p className="text-green-500 font-semibold text-xs">online</p>}
         />
         <ScrollArea className="overflow-y-auto flex-1 bg-[#F3F4F6] px-3">
            {messages?.map((message, i) => (
               <React.Fragment>
                  <Message //
                     message={message}
                     me={i % 2 === 0}
                     members={chatInfo.details.members}
                  />
               </React.Fragment>
            ))}
            <Typing />
            <div ref={scrollRef} />
         </ScrollArea>
         <SendMessage />
      </AsideMenu>
   );
}
