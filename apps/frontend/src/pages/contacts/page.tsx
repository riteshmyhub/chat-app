import { BottomSheet } from "@/components";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchPage from "./search/page";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { Skeleton } from "@/ui/skeleton";
import { contactService } from "@/store/services/contect.service";
import { IMessage } from "@/types/chat.type";

export default function ContactsPage() {
   const navigate = useNavigate();
   const sheetRef = useRef<any>(null);
   const dispatch = useAppDispatch();
   const { loadings, contacts } = useAppSelector((state) => state.contact);
   const { onlineUsers, typing } = useAppSelector((state) => state.chat);
   console.log(onlineUsers);

   useEffect(() => {
      dispatch(contactService.getContacts.api());
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
                     const fullname = `${contact?.profile?.first_name} ${contact?.profile?.last_name}`;
                     const unseenMessages: IMessage[] = [];
                     return (
                        <div key={`contact-${idx}`} className="flex items-center p-2 px-3 gap-3 bg-white hover:bg-[#F0F2F5] border-b-2" role="button" onClick={() => navigate(contact._id)}>
                           <div className="basis-1/6 flex justify-center">
                              <span className="relative inline-block">
                                 <img //
                                    src={contact?.profile.avatar || "/images/user-placeholder.png"}
                                    alt="avatar"
                                    width={60}
                                    height={60}
                                    className="mx-auto block rounded-full h-[50px] w-[50px] object-cover"
                                 />
                                 {onlineUsers?.includes(contact._id) && (
                                    <span //
                                       className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"
                                    />
                                 )}
                              </span>
                           </div>
                           <div className="basis-1/2">
                              <span className="block text-lg font-normal">{fullname}</span>
                              {typing?.includes(fullname) ? ( //
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
