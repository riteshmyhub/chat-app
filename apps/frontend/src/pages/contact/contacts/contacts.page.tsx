import { BottomSheet, Image } from "@/components";
import { useAppSelector } from "@/store/store";
import { Skeleton } from "@/ui/skeleton";
import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import SearchPage from "../search/page";
import { SearchIcon } from "lucide-react";

export default function ContactsPage() {
   const { id } = useParams();
   const sheetRef = useRef<any>(null);
   const { loadings, contacts } = useAppSelector((state) => state.contact);
   const { onlineUsers, unreadMessages, typing } = useAppSelector((state) => state.chat);

   if (loadings.getContacts) {
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

   return (
      <React.Fragment>
         <span className="text-2xl font-medium capitalize block p-2">contacts</span>
         <div className="p-2">
            <button className="border w-full text-start p-3 text-gray-400 text-sm flex justify-between items-center" onClick={() => sheetRef.current.setToggle(true)}>
               Search New Contacts <SearchIcon size={18} />
            </button>
            <BottomSheet ref={sheetRef} heading="Search New Contacts" className="p-3">
               <SearchPage onClose={() => sheetRef.current.setToggle(false)} />
            </BottomSheet>
         </div>
         {contacts.length ? (
            <React.Fragment>
               {contacts?.map((contact, idx) => {
                  const unseenMessages = unreadMessages?.filter((message) => message?.chat === contact?.chatID);
                  const activeClass = id === contact.chatID ? "bg-[#F0F2F5]" : "bg-white";
                  return (
                     <Link role="button" to={`/contacts/${contact.chatID}`} key={`contact-${idx}`} className={`flex items-center p-2 px-3 gap-3 hover:bg-[#F0F2F5] border-b-[1px] ${activeClass}`}>
                        <div className="basis-1/4 flex justify-center">
                           <span className="relative inline-block">
                              <Image //
                                 src={contact?.avatar}
                                 alt="avatar"
                                 className="block rounded-full h-[60px] w-[60px] object-cover mx-auto border"
                                 asAvatar
                              />
                              {onlineUsers.includes(contact._id) && ( //
                                 <span //
                                    className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"
                                 />
                              )}
                           </span>
                        </div>
                        <div className="basis-1/2">
                           <span className="block text-lg font-normal">{contact?.name}</span>
                           {typing ? ( //
                              <span className="block text-xs font-medium text-gray-400">typing...</span>
                           ) : (
                              <span className="block text-xs font-medium">{unseenMessages[unseenMessages?.length - 1]?.content}</span>
                           )}
                        </div>
                        <div className="basis-1/4 flex justify-center items-center">
                           {/*  */}
                           {Boolean(unseenMessages?.length) && <span data-badge={unseenMessages?.length} />}
                           {/*  */}
                        </div>
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
