import { contactService } from "@/api/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { AvatarProfile, DebounceSearch, Header, Loading } from "@/shared/components";
import { Button } from "@/shared/ui/button";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function SearchPage() {
   const dispatch = useAppDispatch();
   const { contact } = useAppSelector((state) => state.contactReducer);
   const navigate = useNavigate();

   const addContact = async (id: string) => {
      try {
         await dispatch(contactService.addContact.api(id)).unwrap();
         navigate("/chat", { replace: true });
      } catch (error) {
         return;
      }
   };

   return (
      <>
         <Header title="Search Contacts" back="/chat/contacts" />
         <div className="p-3">
            <DebounceSearch //
               handler={async (str) => {
                  try {
                     const { data } = await dispatch(contactService.searchUsers.api(str)).unwrap();
                     return data?.contacts;
                  } catch (error) {
                     return [];
                  }
               }}
               className="h-12 rounded-none"
               placeholder="Search New Contacts">
               {({ loading, items: users }) => {
                  if (loading) {
                     return <Loading loading={loading} className="h-12 flex items-center justify-center border mt-2" />;
                  }
                  return (
                     <div className="h-56">
                        {users?.map((user) => {
                           return (
                              <div className="flex items-center p-2 bg-white hover:bg-[#F0F2F5] border-b-2 px-3 mt-2 gap-3">
                                 <div className="basis-1/6">
                                    <span className="relative">
                                       <AvatarProfile src={user?.profile?.avatar} height="56px" width="56px" fallBackTxt={`${user?.profile?.first_name} ${user?.profile?.last_name}`} />
                                    </span>
                                 </div>
                                 <div className="basis-1/2">
                                    <span className="block text-md font-medium">
                                       {user?.profile?.first_name} {user?.profile?.last_name}
                                    </span>
                                    <span className="text-xs block">{user?.email}</span>
                                 </div>
                                 <div className="basis-1/4 text-end">
                                    <Button className="text-xs flex gap-2 mx-auto" size="sm" onClick={() => addContact(user?._id)} disabled={contact.isAdding}>
                                       {contact.isAdding ? <LoaderCircleIcon size={16} className="spin" /> : <PlusIcon size={16} />}
                                       ADD
                                    </Button>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  );
               }}
            </DebounceSearch>
         </div>
      </>
   );
}
