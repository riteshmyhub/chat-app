import { IMember } from "@/api/types/channel.type";
import { IMessage } from "@/api/types/message,type";
import { CheckCheckIcon } from "lucide-react";
import moment from "moment";

type Props = {
   message: IMessage;
   me: boolean;
   isChannel: boolean;
   members?: IMember[];
};

export default function Message({ message, me, isChannel, members }: Props) {
   const person = members?.find((member) => member?._id === message?.from);
   return (
      <div className={me ? "text-end text-white" : "text-start"}>
         <span className="inline-flex gap-3 mb-4">
            {!me && isChannel && (
               <div>
                  <img src={person?.profile.avatar} alt="avatar" className="rounded-full h-10 w-10 object-cover" />
               </div>
            )}
            <div>
               {!me &&
                  isChannel && ( //
                     <small className="text-red-600 block text-start pb-2 text-xs font-semibold ">
                        {person?.profile?.first_name} {person?.profile?.last_name}
                     </small>
                  )}
               <div className="p-2" style={{ background: me ? "#4F46E5" : "white" }}>
                  {message.content && (
                     <span className="block text-sm text-start break-words whitespace-pre-wrap p-1" style={{ maxWidth: "450px" }}>
                        {message.content}
                     </span>
                  )}
               </div>
               <div className="flex items-center mt-1 justify-end gap-2">
                  <small className="text-[10px] text-black block">&nbsp;&nbsp;&nbsp;&nbsp;{moment(message.createdAt).format("LT")}</small>
                  {me && Object.keys(message).includes("isRead") && <CheckCheckIcon size={20} className={message.isRead ? "text-[#4F46E5]" : "text-gray-300"} />}
               </div>
            </div>
         </span>
      </div>
   );
}
