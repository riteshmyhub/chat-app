import { DebounceSearch, Loading } from "@/components";
import { channelService } from "@/store/services/channel.service";
import { contactService } from "@/store/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IChatDetails, IMember } from "@/types/chat.type";
import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { LoaderCircleIcon, PlusIcon, XIcon } from "lucide-react";

export default function ChannelDetailsPage({ chatDetails }: { chatDetails: IChatDetails }) {
   const { loadings } = useAppSelector((state) => state.channel);
   const { authUser } = useAppSelector((state) => state.auth);
   const { onlineUsers } = useAppSelector((state) => state.chat);
   const dispatch = useAppDispatch();
   const isAdmin = authUser?._id === chatDetails?.creator;

   const searchHandler = async (str: string) => {
      const { data } = await dispatch(contactService.searchUsers.api(str)).unwrap();
      return data?.contacts as any;
   };

   const addMembers = (members: string, reset?: () => void) => {
      dispatch(channelService.addMembers.api({ members: [members], channelID: chatDetails?._id }))
         .unwrap()
         .then(() => reset && reset())
         .catch((e) => e);
   };

   const removeMember = (memberID: string) => {
      dispatch(channelService.removeMember.api({ memberID, channelID: chatDetails._id }));
   };

   return (
      <div className="p-3">
         <span className="text-lg block font-semibold">Channel Details</span>
         <div>
            <img src={chatDetails.avatar || "/images/group-chat-placeholder.png"} alt="avatar" className="h-36 w-36 mx-auto rounded-full border" />
            <h3 className="text-2xl text-center mb-2 font-medium">{chatDetails?.name}</h3>
            <h3 className="text-md text-center font-normal">{chatDetails?.about}</h3>
         </div>
         <div className="py-2">
            <span className="text-md text-gray-500">Members {chatDetails?.members?.length}</span>
            {isAdmin && (
               <div className="relative">
                  <DebounceSearch handler={searchHandler}>
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
                                          <img //
                                             src={user.profile.avatar || "/images/user-placeholder.png"}
                                             alt="avatar"
                                             className="w-10 h-10 rounded-full mx-auto"
                                          />
                                       </div>
                                       <div className="basis-1/2">
                                          <span className="block text-sm font-medium">
                                             {user.profile.first_name} {user.profile.last_name}
                                          </span>
                                          <span className="block text-xs">{user.email}</span>
                                       </div>
                                       <div className="basis-1/4 text-end">
                                          <Button
                                             type="button"
                                             className="bg-green-500 text-xs flex gap-1 items-center disabled:bg-gray-300 hover:bg-green-400"
                                             size="sm"
                                             onClick={() => addMembers(user?._id, reset)}
                                             disabled={loadings.addMembers}>
                                             {loadings.addMembers ? ( //
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
                        <img //
                           src={member.profile.avatar || "/images/user-placeholder.png"}
                           alt="member-avatar"
                           className="w-11 h-11 rounded-full"
                        />
                        {onlineUsers.includes(member._id) && member._id !== authUser?._id && (
                           <span //
                              className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"
                           />
                        )}
                     </span>
                  </div>
                  <div className="basis-1/2">
                     <p className="text-sm">
                        {member?._id === chatDetails.creator && "(admin) "}
                        {authUser?._id === member._id ? "you" : `${member.profile.first_name} ${member.profile.last_name}`}
                     </p>
                     <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                  {isAdmin && (
                     <div className="basis-1/4">
                        <button className="text-xs text-red-600 bg-red-200 px-4 py-1 flex gap-2 items-center" onClick={() => removeMember(member._id)}>
                           Remove
                           {loadings.removeMember && <LoaderCircleIcon className="spin mx-auto" size={13} />}
                        </button>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
}
