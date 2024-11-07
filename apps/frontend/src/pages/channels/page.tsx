import { BottomSheet } from "@/components";
import { chatService } from "@/store/services/chat.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Skeleton } from "@/ui/skeleton";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateChannelPage from "./create-channel/page";

export default function ChannelsPage() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { loadings, channels, unreadMessages, typing } = useAppSelector((state) => state.chat);
   const sheetRef = useRef<any>(null);

   useEffect(() => {
      dispatch(chatService.getChannels.api());
      return () => {};
   }, []);

   return (
      <div className="p-2">
         <ul>
            <div className="flex items-center justify-between">
               <span className="text-xl font-medium capitalize block my-2">Channels</span>
               <PlusIcon role="button" onClick={() => sheetRef.current.setToggle(true)} />
               <BottomSheet ref={sheetRef} heading="create channels" className="p-3 overflow-y-auto">
                  <CreateChannelPage onClose={() => sheetRef.current.setToggle(false)} />
               </BottomSheet>
            </div>
            {loadings.getChannels ? (
               <React.Fragment>
                  {[1, 2].map((_, idx) => (
                     <div key={`channel-${idx}`} className="flex items-center p-2 px-3 mt-2 gap-3">
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
            ) : (
               <React.Fragment>
                  {channels?.map((channel, idx) => {
                     const unseenMessages = unreadMessages?.filter((message) => message?.chat === channel?._id);
                     return (
                        <div key={`chat-${idx}`} className="flex items-center p-2 px-3 gap-3 bg-white hover:bg-[#F0F2F5] border-b-2" role="button" onClick={() => navigate(channel._id)}>
                           <div className="basis-1/6 flex justify-center">
                              <img //
                                 src={channel?.avatar || "/images/group-chat-placeholder.png"}
                                 className="h-16 w-16 rounded-full object-cover"
                                 alt="avatar"
                              />
                           </div>
                           <div className="basis-1/2">
                              <span className="block text-lg font-normal">{channel.name}</span>
                              {typing.text && channel._id === typing.chatID ? ( //
                                 <span className="block text-xs font-medium text-gray-400">{typing.text}</span>
                              ) : (
                                 <span className="block text-xs font-medium">{unseenMessages[unseenMessages?.length - 1]?.content}</span>
                              )}
                           </div>
                           <div className="basis-1/4 text-center">{Boolean(unseenMessages?.length) && <span data-badge={unseenMessages?.length} />}</div>
                        </div>
                     );
                  })}
               </React.Fragment>
            )}
         </ul>
      </div>
   );
}
