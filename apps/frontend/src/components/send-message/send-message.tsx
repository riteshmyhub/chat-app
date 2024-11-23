import React, { useRef, useState } from "react";
import { Button } from "@/ui/button";
import { PaperclipIcon, SendHorizontalIcon, XIcon } from "lucide-react";
import { useFileUploader } from "use-hooks-zone";
import { IChatDetails } from "@/types/chat.type";
import { useSocket } from "@/hooks/socket/useSocket.hook";
import { useAppSelector } from "@/store/store";

type Props = { chatDetails: IChatDetails };

export function SendMessage({ chatDetails }: Props) {
   const messageRef = useRef<HTMLDivElement>(null); // Ref for contentEditable
   const { authUser } = useAppSelector((state) => state.auth);
   const { socket } = useSocket();
   const [typing, setTyping] = useState(false);
   const timer = useRef<any>(null);
   const upload = useFileUploader({
      defaultFileIcon: "https://static.thenounproject.com/png/375312-200.png",
      base64: true,
      dragAndDrop: false,
      sizeLimit: 200 * 1024 * 1024, //200 mb
      limit: 6,
      allowExtensions: ["png", "jpg", "jpeg", "webp", "svg", "mp4", "mp3", "m4a"],
   });

   const onTyping = () => {
      const typingData = {
         chat: chatDetails?._id,
         members: chatDetails.members?.map((member) => member._id),
      };

      if (!typing) {
         socket?.emit("TYPING", { ...typingData, isTyping: true });
         setTyping(true);
      }
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
         socket?.emit("TYPING", { ...typingData, isTyping: false });
         setTyping(false);
      }, 500);
   };

   // Handle form submission
   const handleSubmit = (event?: React.FormEvent) => {
      event?.preventDefault();
      const message = messageRef.current?.innerText || ""; // Access inner text of contentEditable div

      const payload = Object.seal({
         chat: chatDetails._id,
         content: message,
         members: chatDetails.members.map((member) => member._id),
         groupChat: chatDetails.groupChat,
         attachments:
            upload?.files?.map((file) => ({
               src: file.base64,
               type: file.type,
               size: file.size,
               name: file.name,
            })) || [],
      });
      socket?.emit("SEND_MESSAGE", payload);
      new Audio(authUser?.setting.send_message_sound?.src).play();
      upload.reset();
      if (messageRef.current) messageRef.current.innerText = "";
   };

   // Handle Enter key press for message submission and Shift + Enter for newline
   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
         if (event.shiftKey) {
            document.execCommand("insertLineBreak");
            event.preventDefault();
         } else {
            // Submit on Enter
            handleSubmit();
            event.preventDefault();
         }
      }
   };

   return (
      <form onSubmit={handleSubmit} className="p-4 flex flex-col space-y-3 w-full border">
         {/* Files Preview */}
         {upload?.files?.length > 0 && (
            <div className="flex flex-wrap space-x-2">
               {upload?.files?.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-200 p-2 rounded-md">
                     <span className="text-sm text-gray-700">{file.name}</span>
                     <button type="button" onClick={() => upload.deleteFile(index)}>
                        <XIcon size={18} />
                     </button>
                  </div>
               ))}
            </div>
         )}

         {/* Message Input */}
         <div className="flex items-end space-x-3">
            <div
               ref={messageRef}
               contentEditable
               className="flex-grow p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-36 overflow-y-auto"
               role="textbox"
               onKeyDown={handleKeyDown} // Add keyboard event handler
               onInput={onTyping}
            />

            {/* File Upload Icon */}
            <label className="cursor-pointer text-gray-500 hover:text-blue-600">
               <input //
                  type="file"
                  className="hidden"
                  onChange={(e) => upload.onSetFile(e.target.files as FileList)}
                  multiple
               />
               <PaperclipIcon size={18} className="text-white bg-blue-600 h-9 w-9 p-2 rounded-full cursor-pointer" />
            </label>
            <Button type="submit" size="sm">
               <SendHorizontalIcon size={22} />
            </Button>
         </div>
      </form>
   );
}
