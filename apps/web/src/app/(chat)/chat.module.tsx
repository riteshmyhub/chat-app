import { Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import NotFoundPage from "../404/not-found.page";
import { useMediaQuery } from "@/shared/hooks";
import ContactsPage from "./contacts/contacts.page";
import EmptyChat from "./messages/partials/EmptyChat";
import ChannelsPage from "./channels/channels.page";
import SingleContactPage from "./contacts/[id]/single-contact.page";
import SingleChannelPage from "./channels/[id]/single-channel.page";
import SearchPage from "./contacts/search/search.page";
import React from "react";

const ChatModule = () => {
   const screen = useMediaQuery();
   const ContactsScreen = screen?.md ? EmptyChat : ContactsPage;
   const ChannelsScreen = screen?.md ? EmptyChat : ChannelsPage;
   const SearchScreen = screen?.md ? EmptyChat : SearchPage;
   return (
      <Routes>
         <Route element={<ChatLayout />}>
            <Route index element={<Navigate to="contacts" replace />} />
            <Route path="contacts" element={<ContactsScreen />} />
            <Route path="channels" element={<ChannelsScreen />} />
            <Route path="search-contact" element={<SearchScreen />} />
            <Route path="contacts/:id" element={<SingleContactPage />} />
            <Route path="channels/:id" element={<SingleChannelPage />} />
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
};

function ChatLayout() {
   const screen = useMediaQuery();
   const { pathname } = useLocation();
   if (screen.md) {
      return (
         <div className="flex h-full">
            <aside className="md:block w-[350px] border-r border-gray-300">
               <React.Fragment>
                  {pathname.includes("contacts") && <ContactsPage />}
                  {pathname.includes("channels") && <ChannelsPage />}
                  {pathname.includes("search") && <SearchPage />}
               </React.Fragment>
            </aside>
            <main className="flex-1 h-full">
               <Outlet />
            </main>
         </div>
      );
   }
   return <Outlet />;
}
export default ChatModule;
