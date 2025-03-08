import { Outlet, Route, Routes, useParams } from "react-router";
import NotFoundPage from "../404/not-found.page";
import { useMediaQuery } from "@/shared/hooks";
import ContactsPage from "./contacts/contacts.page";
import EmptyChat from "./messages/partials/EmptyChat";
import ChannelsPage from "./channels/channels.page";
import SingleContactPage from "./contacts/[id]/single-contact.page";
import SingleChannelPage from "./channels/[id]/single-channel.page";

const ChatModule = () => (
   <Routes>
      <Route path="/" element={<ChatLayout />}>
         <Route index element={<EmptyChat />} />
         <Route path="contacts/:id" element={<SingleContactPage />} />
         <Route path="channels/:id" element={<SingleChannelPage />} /> 
      </Route>
      <Route path="*" element={<NotFoundPage />} />
   </Routes>
);

function ChatLayout() {
   const screen = useMediaQuery();
   const { id } = useParams();

   if (screen.md) {
      return (
         <div className="flex h-full">
            <aside className="md:block w-[350px] border-r border-gray-300">
               <ContactsPage />
               <ChannelsPage />
            </aside>
            <main className="flex-1 h-full">
               <Outlet />
            </main>
         </div>
      );
   }
   return id ? (
      <Outlet />
   ) : (
      <>
         <ContactsPage />
         <ChannelsPage />
      </>
   );
}
export default ChatModule;
