import { IMember } from "@/api/types/chat.type";
import { chatInfo } from "@/mocks/chat-info.mock";
import { messages } from "@/mocks/message.mock";
import { DebounceSearch, Image, Loading, MediaViewer } from "@/shared/components";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import axios from "axios";
import { CircleMinusIcon, CirclePlusIcon, LoaderCircleIcon, PlusIcon, XIcon } from "lucide-react";

export default function Details() {
   return (
      <div className="p-3">
         <span className="text-lg block font-semibold">Details</span>
         <div className="mb-3">
            <Image //
               src={"https://cdn.vectorstock.com/i/1000v/24/27/people-group-avatar-character-vector-12392427.jpg"}
               alt="avatar"
               className="h-24 w-24 mx-auto rounded-full border"
               asAvatar
            />
            <h3 className="text-xl text-center font-medium">BE developer</h3>
            <h3 className="text-sm text-center font-normal">we conjoin app update </h3>
         </div>
         {/* <div className="py-2">
            <span className="text-md text-gray-500 mb-2 block">Media 4</span>
            <MediaViewer //
               mediaList={messages[0].attachments}
            />
         </div> */}
         <div className="py-2">
            <span className="text-md text-gray-500 mb-1 block">Members 12</span>
            <div className="relative">
               <DebounceSearch
                  handler={async (str) => {
                     const { data } = await axios.get(`https://dummyjson.com/users/search?q=${str}`);
                     return data?.users?.map((user: any) => ({
                        email: user?.email,
                        profile: {
                           avatar: user?.image,
                           first_name: user?.firstName,
                           last_name: user?.lastName,
                           email: user?.email,
                        },
                     }));
                  }}>
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
                           <ScrollArea className="h-60 overflow-y-auto bg-white  rounded-md shadow-md absolute top-0 left-0">
                              {items?.map((user: IMember) => (
                                 <div key={user._id} className="flex items-center gap-4 p-3 hover:bg-gray-100 transition-colors duration-200">
                                    {/* Avatar Section */}
                                    <div className="w-12 h-12">
                                       <Image
                                          src={user?.profile?.avatar}
                                          alt={`${user?.profile?.first_name} ${user?.profile?.last_name}'s avatar`}
                                          className="w-12 h-12 rounded-full object-cover mx-auto"
                                          asAvatar
                                       />
                                    </div>

                                    {/* User Info */}
                                    <div className="flex-1">
                                       <span className="block text-sm font-medium text-gray-800">
                                          {user?.profile?.first_name} {user?.profile?.last_name}
                                       </span>
                                       <span className="block text-xs text-gray-500">{user.email}</span>
                                    </div>

                                    {/* Action Button */}
                                    <div className="w-8 h-8 flex justify-center items-center">
                                       <CirclePlusIcon className="text-green-500" size={20} />
                                    </div>
                                 </div>
                              ))}
                           </ScrollArea>
                        </div>
                     );
                  }}
               </DebounceSearch>
            </div>

            {chatInfo?.details.members?.map((member) => (
               <div key={member._id} className="flex items-center gap-4 p-3 hover:bg-gray-100 transition-colors duration-200">
                  {/* Avatar Section */}
                  <div className="w-12 h-12">
                     <Image
                        src={member?.profile?.avatar}
                        alt={`${member?.profile?.first_name} ${member?.profile?.last_name}'s avatar`}
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                        asAvatar
                     />
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                     <span className="block text-sm font-medium text-gray-800">
                        {member?.profile?.first_name} {member?.profile?.last_name}
                     </span>
                     <span className="block text-xs text-gray-500">{member.email}</span>
                  </div>

                  {/* Action Button */}
                  <div className="w-8 h-8 flex justify-center items-center">
                     <CircleMinusIcon className="text-red-500" size={20} />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
