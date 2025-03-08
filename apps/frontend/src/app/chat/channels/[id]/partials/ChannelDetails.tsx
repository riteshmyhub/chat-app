import { channelService } from "@/api/services/channel.service";
import { contactService } from "@/api/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { IChatDetails, IMember } from "@/api/types/chat.type";
import { AvatarProfile, DebounceSearch, Image, Loading } from "@/shared/components";
import { AlertDialog, AlertDialogContent } from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { LoaderCircleIcon, PlusIcon, XIcon } from "lucide-react";
import CreateChannelPage from "../../create-channel/create-channel.page";
import { useState } from "react";

export default function ChannelDetails({ chatDetails }: { chatDetails?: IChatDetails }) {
   const { channel } = useAppSelector((state) => state.channelReducer);
   const { session } = useAppSelector((state) => state.authReducer);
   const { onlineUsers } = useAppSelector((state) => state.chatReducer);
   const [toggle, setToggle] = useState(false);
   const dispatch = useAppDispatch();
   const isAdmin = session?.data?._id === chatDetails?.creator;

   const searchHandler = async (str: string) => {
      const { data } = await dispatch(contactService.searchUsers.api(str)).unwrap();
      return data?.contacts as any;
   };

   const addMembers = (members: string, reset?: () => void) => {
      dispatch(channelService.addMembers.api({ members: [members], channelID: chatDetails?._id as any }))
         .unwrap()
         .then(() => reset && reset())
         .catch((e) => e);
   };

   const removeMember = (memberID: string) => {
      dispatch(channelService.removeMember.api({ memberID, channelID: chatDetails?._id as any }));
   };

   return (
      <div className="p-3">
         <span className="text-lg block font-semibold">Channel Details</span>
         <div>
            <Image //
               src={chatDetails?.avatar}
               alt="avatar"
               className="h-24 w-24 mx-auto rounded-full border"
               noImg="/images/group-chat-placeholder.png"
            />
            <h3 className="text-2xl text-center font-medium">{chatDetails?.name}</h3>
            <h3 className="text-md text-center font-normal">{chatDetails?.about}</h3>
            {isAdmin && (
               <>
                  <Button size="sm" className="uppercase" onClick={() => setToggle(true)}>
                     upadate
                  </Button>
                  <AlertDialog open={toggle}>
                     <AlertDialogContent>
                        <CreateChannelPage
                           onClose={() => setToggle(false)}
                           upadateData={{
                              name: chatDetails?.name,
                              about: chatDetails?.about,
                              avatar: chatDetails?.avatar,
                              channelID: chatDetails?._id,
                           }}
                        />
                     </AlertDialogContent>
                  </AlertDialog>
               </>
            )}
         </div>

         <div className="py-2">
            {isAdmin && (
               <div className="relative">
                  <DebounceSearch //
                     handler={searchHandler}
                     label={`Members ${chatDetails?.members?.length}`}
                     placeholder="Search Members">
                     {({ loading, items, str, reset }) => {
                        if (loading) {
                           return <Loading loading={loading} className="h-12 flex items-center justify-center border mt-2" />;
                        }
                        if (!str || !items.length) {
                           return "";
                        }
                        return (
                           <div className="bg-white border shadow-md" style={{ position: "absolute", top: "44px", left: "0", width: "100%", zIndex: 2 }}>
                              <div className="flex items-center justify-between p-2">
                                 <span className="text-md">users : {items?.length}</span>
                                 <XIcon size={18} role="button" onClick={reset} />
                              </div>
                              <ScrollArea className="max-h-60 overflow-y-auto bg-white">
                                 {items?.map((user: IMember) => (
                                    <div key={user._id} className="flex gap-4 items-center p-2">
                                       <div className="basis-1/5">
                                          <Image //
                                             src={user?.profile?.avatar}
                                             alt="avatar"
                                             className="w-10 h-10 rounded-full mx-auto"
                                             asAvatar
                                          />
                                       </div>
                                       <div className="basis-1/2">
                                          <span className="block text-sm font-medium">
                                             {user.profile.first_name} {user?.profile?.last_name}
                                          </span>
                                          <span className="block text-xs">{user?.email}</span>
                                       </div>
                                       <div className="basis-1/4 text-end">
                                          <Button
                                             type="button"
                                             className="bg-green-500 text-xs flex gap-1 items-center disabled:bg-gray-300 hover:bg-green-400"
                                             size="sm"
                                             onClick={() => addMembers(user?._id, reset)}
                                             disabled={channel.isMembersAdding}>
                                             {channel.isMembersAdding ? ( //
                                                <LoaderCircleIcon className="spin mx-auto" size={13} />
                                             ) : (
                                                <PlusIcon className="mx-auto" size={13} />
                                             )}
                                             Add
                                          </Button>
                                       </div>
                                    </div>
                                 ))}
                              </ScrollArea>
                           </div>
                        );
                     }}
                  </DebounceSearch>
               </div>
            )}
            {chatDetails?.members?.map((member) => (
               <div key={member?._id} className="flex gap-4 items-center p-2">
                  <div className="basis-1/6">
                     <span className="relative inline-block">
                        <AvatarProfile //
                           src={member?.profile?.avatar || ""}
                           fallBackTxt={`${member?.profile?.first_name} ${member?.profile?.last_name}`}
                           isOnline={onlineUsers.includes(member._id) && member._id !== session?.data?._id}
                        />
                     </span>
                  </div>
                  <div className="basis-1/2">
                     <p className="text-sm">
                        {member?._id === chatDetails?.creator && "(admin) "}
                        {session?.data?._id === member._id ? "you" : `${member?.profile?.first_name} ${member?.profile?.last_name}`}
                     </p>
                     <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                  {isAdmin && (
                     <div className="basis-1/4">
                        <button className="text-xs text-red-600 bg-red-200 px-4 py-1 flex gap-2 items-center" onClick={() => removeMember(member._id)}>
                           Remove
                           {channel.isMemberRemoving && <LoaderCircleIcon className="spin mx-auto" size={13} />}
                        </button>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
}
