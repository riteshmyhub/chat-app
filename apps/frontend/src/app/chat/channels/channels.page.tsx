import { useAppSelector } from "@/api/store";
import { AvatarProfile } from "@/shared/components";
import { Skeleton } from "@/shared/ui/skeleton";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import CreateChannelPage from "./create-channel/create-channel.page";
import { AlertDialog, AlertDialogContent } from "@/shared/ui/alert-dialog";
import ChatTabs from "../messages/partials/ChatTabs";

export default function ChannelsPage() {
   const { channel } = useAppSelector((state) => state.channelReducer);
   const { id } = useParams();
   const { unreadMessages } = useAppSelector((state) => state.messageReducer);
   const [toggle, setToggle] = useState(false);
   return (
      <>
         <div className="flex items-center justify-between p-2 mt-4">
            <span className="text-3xl font-medium capitalize block">Channels</span>
            <PlusIcon size={22} onClick={() => setToggle(true)} />
            <AlertDialog open={toggle}>
               <AlertDialogContent className="bg-transparent shadow-none">
                  <div className="bg-white p-3 rounded-lg">
                     <CreateChannelPage onClose={() => setToggle(false)} />
                  </div>
               </AlertDialogContent>
            </AlertDialog>
         </div>
         <ChatTabs />
         {channel?.isLoading ? (
            <React.Fragment>
               {[1, 2].map((_, idx) => (
                  <div key={`contects-${idx}`} className="flex items-center p-2 px-3 gap-3">
                     <div className="basis-1/4 flex justify-center">
                        <Skeleton className="h-[50px] w-[50px] rounded-full" />
                     </div>
                     <div className="basis-1/2">
                        <Skeleton className="h-4 w-[90%] rounded-full mb-2" />
                        <Skeleton className="h-2 w-[40%] rounded-full" />
                     </div>
                  </div>
               ))}
            </React.Fragment>
         ) : (
            <React.Fragment>
               {channel?.list.map((channel) => {
                  const activeClass = id === channel?._id ? "bg-[#F0F2F5]" : "bg-white";
                  const unseenMessages = unreadMessages?.filter((message) => message?.chat === channel?._id);
                  return (
                     <Link key={channel?._id} role="button" to={`/chat/channels/${channel?._id}`} className={`flex items-center p-2 px-3 gap-3 hover:bg-[#F0F2F5] border-b-[1px] ${activeClass}`}>
                        <div className="basis-[20%] flex justify-center">
                           <AvatarProfile src={channel?.avatar} fallBackTxt={channel?.name} height="60px" width="60px" />
                        </div>
                        <div className="basis-[70%]">
                           <span className="block text-[18px] font-semibold">{channel?.name}</span>
                           <span className="block text-xs font-medium">{unseenMessages[unseenMessages?.length - 1]?.content}</span>
                        </div>
                        <div className="basis-[10%] flex justify-center items-center">{Boolean(unseenMessages?.length) && <span data-badge={unseenMessages?.length} />} </div>
                     </Link>
                  );
               })}
            </React.Fragment>
         )}
      </>
   );
}
