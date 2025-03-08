import moment from "moment";
import { IMember, IMessage } from "@/api/types/chat.type";
import { AvatarProfile, MediaViewer } from "@/shared/components";

type Props = {
   message: IMessage;
   me: boolean;
   members?: IMember[];
};

export default function Message({ message, me, members }: Props) {
   const person = members?.find((member) => member?._id === message?.from);

   return (
      <div className={me ? "text-end text-white" : "text-start"}>
         <span className="inline-flex gap-3 mb-4">
            {!me && message.isChannel && (
               <div>
                  <AvatarProfile //
                     src={person?.profile?.avatar}
                     fallBackTxt={`${person?.profile?.first_name} ${person?.profile?.last_name}`}
                     height="40px"
                     width="40px"
                  />
               </div>
            )}
            <div>
               {!me &&
                  message.isChannel && ( //
                     <small className="text-red-600 block text-start pb-2 text-xs font-semibold ">
                        {person?.profile?.first_name} {person?.profile?.last_name}
                     </small>
                  )}
               <div className="p-2" style={{ background: me ? "#4F46E5" : "white" }}>
                  {Boolean(message?.attachments?.length) && ( //
                     <MediaViewer mediaList={message?.attachments} />
                  )}
                  {message.content && (
                     <span className="block text-sm text-start break-words whitespace-pre-wrap p-1" style={{ maxWidth: "450px" }}>
                        {message.content}
                     </span>
                  )}
               </div>
               <div className="flex items-center mt-1 justify-end gap-2">
                  <small className="text-[10px] text-black block">&nbsp;&nbsp;&nbsp;&nbsp;{moment(message.createdAt).format("LT")}</small>
               </div>
            </div>
         </span>
      </div>
   );
}
