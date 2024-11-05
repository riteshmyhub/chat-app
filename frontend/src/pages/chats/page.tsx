import { BottomSheet } from "@/components";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchPage from "./search/page";
import { chatService } from "@/store/services/chat.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Skeleton } from "@/ui/skeleton";

export default function ChatsPage() {
   const navigate = useNavigate();
   const sheetRef = useRef<any>(null);
   const dispatch = useAppDispatch();
   const { loadings, contacts, onlineUsers, unreadMessages, typing } = useAppSelector((state) => state.chat);

   useEffect(() => {
      dispatch(chatService.getContacts.api());
      return () => {};
   }, []);

   return (
      <div className="p-2">
         <button className="border w-full text-start p-3 text-gray-400 text-sm" onClick={() => sheetRef.current.setToggle(true)}>
            Search New Contacts
         </button>
         <BottomSheet ref={sheetRef} heading="Search New Contacts" className="p-3">
            <SearchPage onClose={() => sheetRef.current.setToggle(false)} />
         </BottomSheet>
         <ul>
            <span className="text-xl font-medium capitalize block my-2">contacts</span>
            {loadings.getContacts ? (
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
            ) : (
               <React.Fragment>
                  {contacts?.map((contact, idx) => {
                     const unseenMessages = unreadMessages?.filter((message) => message?.chat === contact?._id);
                     return (
                        <div key={`chat-${idx}`} className="flex items-center p-2 px-3 gap-3 bg-white hover:bg-[#F0F2F5] border-b-2" role="button" onClick={() => navigate(contact._id)}>
                           <div className="basis-1/6 flex justify-center">
                              <span className="relative inline-block">
                                 <img //
                                    src={contact?.avatar || "/images/user-placeholder.png"}
                                    alt="avatar"
                                    width={60}
                                    height={60}
                                    className="mx-auto block rounded-full h-[50px] w-[50px] object-cover"
                                 />
                                 {contact.members.every((user) => onlineUsers.includes(user._id)) && ( //
                                    <span //
                                       className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"
                                    />
                                 )}
                              </span>
                           </div>
                           <div className="basis-1/2">
                              <span className="block text-lg font-normal">{contact.name}</span>
                              {typing.text && contact._id === typing.chatID ? ( //
                                 <span className="block text-xs font-medium text-gray-400">typing...</span>
                              ) : (
                                 <span className="block text-xs font-medium">{unseenMessages[unseenMessages?.length - 1]?.content}</span>
                              )}
                           </div>
                           <div className="basis-1/4 text-center">
                              {/*  */}
                              {Boolean(unseenMessages?.length) && <span data-badge={unseenMessages?.length} />}
                              {/*  */}
                           </div>
                        </div>
                     );
                  })}
               </React.Fragment>
            )}
         </ul>
      </div>
   );
}
