import { DebounceSearch, Image } from "@/components";
import { contactService } from "@/store/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ISearchContact } from "@/types/contact.type";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import React from "react";

type Props = {
   onClose: Function;
};

export default function SearchPage({ onClose }: Props) {
   const dispatch = useAppDispatch();
   const { loadings } = useAppSelector((state) => state.contact);
   const addContact = async (id: string) => {
      try {
         await dispatch(contactService.addContact.api(id)).unwrap();
         onClose();
      } catch (error) {
         return;
      }
   };

   return (
      <div>
         <DebounceSearch
            handler={async (str) => {
               try {
                  const { data } = await dispatch(contactService.searchUsers.api(str)).unwrap();
                  return data?.contacts;
               } catch (error) {
                  return [];
               }
            }}>
            {({ loading, items }) => (
               <div className="h-56">
                  {loading ? (
                     [1, 2, 3].map((_, idx) => (
                        <React.Fragment key={`chats-search-${idx}`}>
                           <div className="flex items-center p-2 px-3 mt-2 gap-3">
                              <div className="basis-1/6">
                                 <Skeleton className="h-16 w-16 rounded-full" />
                              </div>
                              <div className="basis-1/2">
                                 <Skeleton className="h-4 w-full rounded-full mb-2" />
                                 <Skeleton className="h-2 w-[40%] rounded-full" />
                              </div>
                              <div className="basis-1/4 text-end">
                                 <Skeleton className="h-8 w-16 mx-auto" />
                              </div>
                           </div>
                        </React.Fragment>
                     ))
                  ) : (
                     <>
                        {items?.map((user: ISearchContact) => (
                           <div key={user._id} className="flex items-center p-2 bg-white hover:bg-[#F0F2F5] border-b-2 px-3 mt-2 gap-3">
                              <div className="basis-1/6">
                                 <span className="relative">
                                    <Image src={user?.profile?.avatar} alt="avatar" className="h-14 w-14 rounded-full object-cover" asAvatar />
                                 </span>
                              </div>
                              <div className="basis-1/2">
                                 <span className="block text-md font-medium">
                                    {user.profile?.first_name} {user.profile?.last_name}
                                 </span>
                                 <span className="text-xs block">{user?.email}</span>
                              </div>
                              <div className="basis-1/4 text-end">
                                 <Button //
                                    className="text-xs flex gap-2 mx-auto"
                                    size="sm"
                                    onClick={() => addContact(user._id)}
                                    disabled={loadings.addContact}>
                                    {loadings.addContact ? ( ///
                                       <LoaderCircleIcon size={16} className="spin" />
                                    ) : (
                                       <PlusIcon size={16} />
                                    )}
                                    ADD
                                 </Button>
                              </div>
                           </div>
                        ))}
                     </>
                  )}
               </div>
            )}
         </DebounceSearch>
      </div>
   );
}
