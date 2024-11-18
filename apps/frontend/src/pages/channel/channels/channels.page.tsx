import { BottomSheet } from "@/components";
import { useAppSelector } from "@/store/store";
import { Skeleton } from "@/ui/skeleton";
import { PlusIcon } from "lucide-react";
import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import CreateChannelPage from "../create-channel/page";

export default function ChannelsPage() {
   const { id } = useParams();
   const sheetRef = useRef<any>(null);
   const { loadings, channels } = useAppSelector((state) => state.channel);
   const { unreadMessages, typing } = useAppSelector((state) => state.chat);

   if (loadings.getChannels) {
      return (
         <React.Fragment>
            {[1, 2].map((_, idx) => (
               <div key={`contects-${idx}`} className="flex items-center p-2 px-3 mt-2 gap-3">
                  <div className="basis-1/6 flex justify-center">
                     <Skeleton className="h-16 w-16 rounded-full" />
                  </div>
                  <div className="basis-1/2">
                     <Skeleton className="h-4 w-[90%] rounded-full mb-2" />
                     <Skeleton className="h-2 w-[40%] rounded-full" />
                  </div>
               </div>
            ))}
         </React.Fragment>
      );
   }
   if (!channels.length) {
      return "No Contact";
   }

   return (
      <React.Fragment>
         <div className="flex items-center justify-between p-2">
            <span className="text-xl font-medium capitalize block my-2">Channels</span>
            <PlusIcon role="button" onClick={() => sheetRef.current.setToggle(true)} />
            <BottomSheet ref={sheetRef} heading="create channels" className="p-3 overflow-y-auto">
               <CreateChannelPage onClose={() => sheetRef.current.setToggle(false)} />
            </BottomSheet>
         </div>
         {channels.length ? (
            <React.Fragment>
               {channels?.map((channel, idx) => {
                  const unseenMessages = unreadMessages?.filter((message) => message?.chat === channel?._id);
                  const activeClass = id === channel._id ? "bg-[#F0F2F5]" : "bg-white";
                  return (
                     <Link key={`chat-${idx}`} className={`flex items-center p-2 px-3 gap-3 hover:bg-[#F0F2F5] border-b-[1px] ${activeClass}`} role="button" to={`/channels/${channel._id}`}>
                        <div className="basis-1/4">
                           <img //
                              src={channel?.avatar || "/images/group-chat-placeholder.png"}
                              alt="avatar"
                              className="mx-auto block rounded-full h-[60px] w-[60px] border  object-contain"
                           />
                        </div>
                        <div className="basis-1/2">
                           <span className="block text-lg font-normal">{channel.name}</span>
                           {typing && channel._id === typing ? ( //
                              <span className="block text-xs font-medium text-gray-400">{typing}</span>
                           ) : (
                              <span className="block text-xs font-medium">{unseenMessages[unseenMessages?.length - 1]?.content}</span>
                           )}
                        </div>
                        <div className="basis-1/4 flex justify-center">{Boolean(unseenMessages?.length) && <span data-badge={unseenMessages?.length} />}</div>
                     </Link>
                  );
               })}
            </React.Fragment>
         ) : (
            ""
         )}
      </React.Fragment>
   );
}
