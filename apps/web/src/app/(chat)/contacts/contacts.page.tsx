import { Link, useNavigate, useParams } from "react-router";
import { SearchIcon } from "lucide-react";
import { AvatarProfile } from "@/shared/components";
import React from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { useAppSelector } from "@/api/store";
import ChatTabs from "../messages/partials/ChatTabs";

export default function ContactsPage() {
   const { contact } = useAppSelector((state) => state.contactReducer);
   const { onlineUsers } = useAppSelector((state) => state.chatReducer);
   const { unreadMessages } = useAppSelector((state) => state.messageReducer);
   const { id } = useParams();
   const navigate = useNavigate();

   return (
      <div className="bg-[#F3F4F6] h-full overflow-hidden">
         <div className="p-2 flex items-center justify-between">
            <span className="text-4xl font-medium capitalize block">Chats</span>
            <button //
               onClick={() => navigate("/chat/search-contact")}
               className="rounded-full text-primary border-2 border-primary p-2">
               <SearchIcon size={14} strokeWidth={3}  />
            </button>
         </div>
         <ChatTabs />
         <div className="bg-white p-[15px] mt-[20px] rounded-t-[40px] h-screen">
            {contact?.isLoading ? (
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
                  {contact.list.map((contact) => {
                     const activeClass = id === contact.chatID ? "bg-[#F0F2F5]" : "bg-white";
                     const isOnline = onlineUsers.includes(contact._id);
                     const unseenMessages = unreadMessages?.filter((message) => message?.chat === contact?.chatID);
                     return (
                        <Link key={contact?._id} role="button" to={`/chat/contacts/${contact?.chatID}`} className={`flex items-center p-2 px-3 gap-3 hover:bg-[#F0F2F5] border-b ${activeClass} mb-2`}>
                           <div className="basis-1/4 flex justify-center">
                              <AvatarProfile //
                                 src={contact?.avatar}
                                 fallBackTxt={contact?.name}
                                 isOnline={isOnline}
                                 height="55px"
                                 width="55px"
                              />
                           </div>
                           <div className="basis-1/2">
                              <span className="block text-[15px] font-semibold">{contact?.name}</span>
                              <span className="block text-xs font-medium">{unseenMessages[unseenMessages?.length - 1]?.content}</span>
                           </div>
                           <div className="basis-1/4 flex justify-center items-center">{Boolean(unseenMessages?.length) && <span data-badge={unseenMessages?.length} />} </div>
                        </Link>
                     );
                  })}
               </React.Fragment>
            )}
         </div>
      </div>
   );
}
