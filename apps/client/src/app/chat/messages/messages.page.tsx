import { ScrollArea } from "@/shared/ui/scroll-area";
import Message from "./partials/Message";
import SendMessage from "./partials/SendMessage";
import { IMessage } from "@/api/types/message,type";
const messages: IMessage[] = [
   {
      attachments: [
         {
            src: "https://example.com/image1.jpg",
            type: "image/jpeg",
            size: 204800,
            name: "image1.jpg",
         },
      ],
      chat: "chat1",
      from: "user1",
      to: "user2",
      isChannel: false,
      content: "Hey! Check out this image.",
      createdAt: new Date().toISOString(),
      _id: "msg1",
      isRead: false,
   },
   {
      attachments: [],
      chat: "chat1",
      from: "user2",
      to: "user1",
      isChannel: false,
      content: "Looks great! Thanks for sharing.",
      createdAt: new Date().toISOString(),
      _id: "msg2",
      isRead: true,
   },
   {
      attachments: [
         {
            src: "https://example.com/document.pdf",
            type: "application/pdf",
            size: 1048576,
            name: "document.pdf",
         },
      ],
      chat: "chat2",
      from: "user3",
      to: "user4",
      isChannel: true,
      content: "Here's the document you requested.",
      createdAt: new Date().toISOString(),
      _id: "msg3",
      isRead: false,
   },
   {
      attachments: [],
      chat: "chat3",
      from: "user5",
      to: "user6",
      isChannel: false,
      content: "Good morning! How's it going?",
      createdAt: new Date().toISOString(),
      _id: "msg4",
      isRead: false,
   },
   {
      attachments: [
         {
            src: undefined,
            type: "audio/mpeg",
            size: 512000,
            name: "voice_note.mp3",
         },
      ],
      chat: "chat1",
      from: "user1",
      to: "user2",
      isChannel: false,
      content: "Sending you a voice note.",
      createdAt: new Date().toISOString(),
      _id: "msg5",
      isRead: true,
   },
];
export default function MessagesPage() {
   return (
      <>
         <ScrollArea className="overflow-y-auto flex-1 bg-[#F3F4F6] px-3">
            {messages?.map((message) => (
               <Message message={message} />
            ))}
         </ScrollArea>
         <SendMessage />
      </>
   );
}
