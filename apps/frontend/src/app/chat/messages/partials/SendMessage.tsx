import React, { useRef, useState } from "react";
import { PaperclipIcon, SendHorizontalIcon, XIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { IChatDetails } from "@/api/types/chat.type";
import sounds from "@/assets/audios/sounds";
import { useSocket } from "@/api/socket/socket";
import toast from "react-hot-toast";

type Props = { chatDetails?: IChatDetails };
export default function SendMessage({ chatDetails }: Props) {
   const messageRef = useRef<HTMLDivElement>(null);
   const [files, setFiles] = useState<any[]>([]);
   const { socket } = useSocket();
   const [typing, setTyping] = useState(false);
   const timer = useRef<any>(null);

   const onTyping = () => {
      const typingData = {
         chat: chatDetails?._id,
         members: chatDetails?.members?.map((member) => member._id),
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
      if (!message && !files?.length) {
         toast.error("Cannot send an empty message or attachment.");
         return;
      }
      socket?.emit("SEND_MESSAGE", {
         chat: chatDetails?._id,
         content: message,
         members: chatDetails?.members?.map((member) => member?._id),
         isChannel: chatDetails?.groupChat,
         attachments: files || [],
      });
      new Audio(sounds.send).play();
      setFiles([]);
      if (messageRef.current) messageRef.current.innerText = "";
   };

   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
         if (event.shiftKey) {
            document.execCommand("insertLineBreak");
            event.preventDefault();
         } else {
            handleSubmit();
            event.preventDefault();
         }
      }
   };

   return (
      <form onSubmit={handleSubmit} className="p-4 flex flex-col space-y-3 w-full border">
         {/* Files Preview */}
         {files?.length > 0 && (
            <div className="flex flex-wrap space-x-2">
               {files?.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-200 p-2 rounded-md">
                     <span className="text-sm text-gray-700">{file.name}</span>
                     <button type="button" onClick={() => setFiles(files.filter((_, idx) => index !== idx))}>
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

            {/* File Upload */}
            <label className="cursor-pointer text-gray-500 hover:text-blue-600">
               <input
                  type="file"
                  className="hidden"
                  onChange={async (event) => {
                     const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB size limit
                     const MAX_FILES = 5;

                     if (!event?.target?.files) return;
                     const file = event?.target?.files?.[0];
                     if (file.size > MAX_FILE_SIZE) {
                        alert(`File "${file.name}" exceeds the size limit of 5MB.`);
                        event.target.value = ""; // Clear the input value
                        return;
                     }

                     const { name, type, size } = file;
                     const reader = new FileReader();
                     reader.onload = () => {
                        setFiles((prev) => {
                           let addedfiles = [{ name, type, size, src: reader.result as string }, ...prev];
                           if (addedfiles.length > MAX_FILES) {
                              alert(`You can only upload up to ${MAX_FILES} files.`);
                              return prev;
                           }
                           return [{ name, type, size, src: reader.result as string }, ...files];
                        });
                     };
                     reader.onerror = () => {
                        alert("Failed to read file. Please try again.");
                     };
                     reader.readAsDataURL(file);
                  }}
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
