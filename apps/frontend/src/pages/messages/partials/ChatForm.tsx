import { useSocket } from "@/hooks/socket/useSocket.hook";
import { useAppSelector } from "@/store/store";
import { PaperclipIcon, SendHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useFileUploader } from "use-hooks-zone";

export default function ChatForm({ id }: { id: string }) {
   const { socket } = useSocket();

   const { authUser } = useAppSelector((state) => state.auth);
   const upload = useFileUploader({
      defaultFileIcon: "https://static.thenounproject.com/png/375312-200.png",
      base64: true,
      dragAndDrop: false,
      sizeLimit: 200 * 1024 * 1024, //200 mb
      limit: 6,
      allowExtensions: ["png", "jpg", "jpeg", "webp", "svg", "mp4", "mp3", "m4a"],
   });

   const [message, setMessage] = useState("");

   const change = (e: React.ChangeEvent<HTMLInputElement>) => {
      switch (e.target.name) {
         case "message":
            setMessage(e.target.value);
            break;
         case "attachments":
            upload.onSetFile(e.target.files as FileList);
            break;
         default:
            break;
      }
   };

   const submit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!message && !upload.files?.length) return;
      const payload = Object.seal({
         chat: id,
         content: message,
         groupChat: false,
         members: [id, authUser?._id],
         attachments:
            upload?.files?.map((file) => ({
               src: file.base64,
               type: file.type,
               size: file.size,
               name: file.name,
            })) || [],
      });
      socket?.emit("SEND_MESSAGE", payload);
      console.log(authUser?.setting.send_message_sound?.src);
      new Audio(authUser?.setting.send_message_sound?.src).play();
      (e.target as any)?.reset();
      setMessage("");
      upload.reset();
   };

   return (
      <form autoComplete="off" className="flex gap-2 items-center h-[72px]" onSubmit={submit}>
         <div className="px-3 w-full">
            <input //
               type="text"
               placeholder="Type a message"
               name="message"
               className="block w-full p-2"
               onChange={change}
               value={message}
            />
         </div>
         <div className="flex items-center justify-evenly w-[150px]">
            <label htmlFor="files">
               <PaperclipIcon size={18} className="text-white bg-blue-600 h-9 w-9 p-2 rounded-full cursor-pointer" />
               <input //
                  type="file"
                  name="attachments"
                  id="files"
                  hidden
                  accept="image/*,video/*,audio/*"
                  multiple
                  onChange={change}
               />
            </label>
            |
            <button type="submit">
               <SendHorizontalIcon size={22} />
            </button>
         </div>
      </form>
   );
}
