import { IMessage } from "@/types/chat.type";
import moment from "moment";
import { MediaViewer } from "../media-viewer/media-viewer";
import { CheckCheckIcon } from "lucide-react";

type Props = {
   message: IMessage;
   me: boolean;
   isChannel: boolean;
};

export default function Message({ message, me, isChannel }: Props) {
   return (
      <div className={me ? "text-end text-white" : "text-start"}>
         <span className="inline-flex gap-3 mb-4">
            {/* {!me && isChannel && (
               <div>
                  <img src={message?.sender?.avatar} alt="avatar" className="rounded-full h-10 w-10 object-cover" />
               </div>
            )} */}
            <div>
               {!me &&
                  isChannel && ( //
                     <small className="text-red-600 block text-start pb-2 text-xs font-semibold ">channel</small>
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
                  {me && Object.keys(message).includes("isRead") && <CheckCheckIcon size={20} className={message.isRead ? "text-[#4F46E5]" : "text-gray-400"} />}
               </div>
            </div>
         </span>
      </div>
   );
}
