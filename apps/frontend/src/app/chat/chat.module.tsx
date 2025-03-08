import { Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router";
import NotFoundPage from "../404/not-found.page";
import { useMediaQuery } from "@/shared/hooks";
import ContactsPage from "./contacts/contacts.page";
import EmptyChat from "./messages/partials/EmptyChat";
import ChannelsPage from "./channels/channels.page";
import SingleContactPage from "./contacts/[id]/single-contact.page";
import SingleChannelPage from "./channels/[id]/single-channel.page";

const ChatModule = () => (
   <Routes>
      <Route element={<ChatLayout />}>
         <Route index element={<Navigate to="contacts" replace />} />
         <Route path="contacts" element={<EmptyChat />} />
         <Route path="channels" element={<EmptyChat />} />
         <Route path="contacts/:id" element={<SingleContactPage />} />
         <Route path="channels/:id" element={<SingleChannelPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
   </Routes>
);

const Pages = ({ pathname }: { pathname: string }) => {
   if (pathname.includes("/contacts")) {
      return <ContactsPage />;
   }
   return <ChannelsPage />;
};

function ChatLayout() {
   const screen = useMediaQuery();
   const { id } = useParams();
   const { pathname } = useLocation();

   if (screen.md) {
      return (
         <div className="flex h-full">
            <aside className="md:block w-[350px] border-r border-gray-300">
               <Pages pathname={pathname} />
            </aside>
            <main className="flex-1 h-full">
               <Outlet />
            </main>
         </div>
      );
   }
   return id ? <Outlet /> : <Pages pathname={pathname} />;
}
export default ChatModule;
