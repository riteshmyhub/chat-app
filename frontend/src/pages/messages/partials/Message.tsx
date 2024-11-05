import { AudioPlayer } from "@/components";
import { dateFromNow } from "@/pipes";
import { IAttachment, IMessage } from "@/types/chat.type";
import { DownloadIcon } from "lucide-react";

type Props = {
   message: IMessage;
   me: boolean;
   isGroupChat: boolean;
};

export default function Message({ message, me, isGroupChat }: Props) {
   return (
      <div className={me ? "text-end text-white" : "text-start"}>
         <span className="inline-flex p-2 mb-2 gap-3">
            {!me && isGroupChat && (
               <div>
                  <img src={message?.sender?.avatar} alt="avatar" height={40} width={40} className="rounded-full" />
               </div>
            )}
            <div style={{ background: me ? "#6876AA" : "#ffffff" }}>
               {!me && isGroupChat && (
                  <small className="text-red-600 block text-start pb-2 text-xs font-semibold p-2">
                     {/*  */}
                     {message?.sender?.name}
                     {/*  */}
                  </small>
               )}
               <MediaViewer attachments={message?.attachments} />
               <span className="block p-2">
                  <span className="block text-sm text-start break-words whitespace-pre-wrap" style={{ maxWidth: "450px" }}>
                     {message.content}
                  </span>
                  <small className="text-xs">&nbsp;&nbsp;&nbsp;&nbsp;{dateFromNow(message.createdAt)}</small>
               </span>
            </div>
         </span>
      </div>
   );
}
const MediaViewer = ({ attachments }: { attachments: IAttachment[] }) => {
   if (!attachments?.length) return null;

   const renderAttachment = (attachment: IAttachment) => {
      switch (true) {
         case attachment.type.includes("image"):
            return <img src={attachment.src} alt={attachment.name} className="mx-auto block w-full h-[200px] object-contain" />;
         case attachment.type.includes("audio"):
            return <AudioPlayer attachment={attachment} />;
         case attachment.type.includes("video"):
            return <video src={attachment.src} controls className="w-full h-full" />;
         default:
            return (
               <div>
                  <img src="/images/file.png" height={70} width={70} className="mx-auto" alt="file" />
                  <span className="text-center block my-3 text-xs">{attachment.name}</span>
               </div>
            );
      }
   };

   return (
      <div className={`grid ${attachments.length > 1 ? "grid-cols-1 md:grid-cols-2 p-3" : "grid-cols-1"} gap-3`}>
         {attachments.map((attachment, idx) => (
            <div key={`attachment-${idx}`} className="bg-gray-300 md:w-[300px] h-[200px] text-black flex items-center justify-center relative">
               {renderAttachment(attachment)}
               {/* Download link for non-video attachments */}
               {!attachment.type.includes("video") && (
                  <a href={attachment?.src} className="absolute top-3 right-3 bg-yellow-500 p-2 rounded-full" download>
                     <DownloadIcon size={20} />
                  </a>
               )}
            </div>
         ))}
      </div>
   );
};
