import { useAppSelector } from "@/api/store";
import { AvatarProfile } from "@/shared/components";
import { Skeleton } from "@/shared/ui/skeleton";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import CreateChannelPage from "./create-channel/create-channel.page";
import { AlertDialog, AlertDialogContent } from "@/shared/ui/alert-dialog";

export default function ChannelsPage() {
   const { channel } = useAppSelector((state) => state.channelReducer);
   const { id } = useParams();
   const { unreadMessages } = useAppSelector((state) => state.messageReducer);
   const [toggle, setToggle] = useState(false);
   return (
      <div>
         <div className="flex items-center justify-between p-2">
            <span className="text-xl font-medium capitalize block my-2">Channels</span>
            <PlusIcon role="button" onClick={() => setToggle(true)} />
            <AlertDialog open={toggle}>
               <AlertDialogContent>
                  <CreateChannelPage onClose={() => setToggle(false)} />
               </AlertDialogContent>
            </AlertDialog>
         </div>
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
                        <div className="basis-1/4 flex justify-center">
                           <AvatarProfile src={channel?.avatar} fallBackTxt={channel?.name} />
                        </div>
                        <div className="basis-1/2">
                           <span className="block text-md font-normal">{channel?.name}</span>
                           <span className="block text-xs font-medium">
                              {unseenMessages[unseenMessages?.length - 1]?.content}
                           </span>
                        </div>
                        <div className="basis-1/4 flex justify-center items-center">{Boolean(unseenMessages?.length) && <span data-badge={unseenMessages?.length} />} </div>
                     </Link>
                  );
               })}
            </React.Fragment>
         )}
      </div>
   );
}
