import { ScrollArea } from "@/shared/ui/scroll-area";
import Message from "./partials/Message";
import SendMessage from "./partials/SendMessage";

export default function MessagesPage() {
   return (
      <>
         <ScrollArea className="overflow-y-auto flex-1 bg-[#F3F4F6] px-3">
            <Message />
            <Message />
            <Message />
         </ScrollArea>
         <SendMessage />
      </>
   );
}
