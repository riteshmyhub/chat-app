import { ScrollArea } from "@/shared/ui/scroll-area";
import React, { useEffect, useRef } from "react";
import Message from "./partials/Message";
import Typing from "./partials/Typing";
import SendMessage from "./partials/SendMessage";
import { useAppSelector } from "@/api/store";
import { IChatDetails } from "@/api/types/chat.type";
import moment from "moment";
import { Badge } from "@/shared/ui/badge";

export default function MessagesPage({ chatDetails }: { chatDetails: IChatDetails }) {
   const { message } = useAppSelector((state) => state.messageReducer);
   const { session } = useAppSelector((state) => state.authReducer);

   const scrollRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
      return () => {};
   }, [message]);

   let lastDate: null | string = null;
   return (
      <>
         {message.list?.length ? (
            <ScrollArea className="overflow-y-auto flex-1 bg-white px-3">
               {message?.list?.map((message) => {
                  const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
                  const showDate = messageDate !== lastDate;
                  lastDate = messageDate;
                  const isToday = moment(message.createdAt).isSame(new Date(), "day");
                  const isYesterday = moment(message.createdAt).isSame(moment().subtract(1, "day"), "day");
                  return (
                     <React.Fragment key={message._id}>
                        {showDate && (
                           <div className="text-center py-3" key={`date-${messageDate}`}>
                              <Badge variant="outline" className="bg-white">
                                 {isToday ? "Today" : isYesterday ? "Yesterday" : moment(message.createdAt).format("LL")}
                              </Badge>
                           </div>
                        )}
                        <Message //
                           message={message}
                           me={session.data?._id === message?.from}
                           members={chatDetails?.members}
                        />
                     </React.Fragment>
                  );
               })}
               <Typing />
               <div className="mt-5" ref={scrollRef} />
            </ScrollArea>
         ) : (
            <div className="p-2 flex justify-center items-center h-[100vh]">no messages</div>
         )}
         <SendMessage chatDetails={chatDetails} />
      </>
   );
}
