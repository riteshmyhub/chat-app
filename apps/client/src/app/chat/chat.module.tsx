import { Navigate, Outlet, Route, Routes } from "react-router";
import ContactLayout from "./contact/contact.layout";
import EmptyChat from "./messages/partials/EmptyChat";
import SingleContactPage from "./contact/[id]/single-contact.page";
import ChannelLayout from "./channel/channel.layout";
import SingleChannelPage from "./channel/[id]/single-channel.page";
import NotFoundPage from "../404/not-found.page";
import NavigationMenu from "./partials/NavigationMenu";

const ChatModule = () => (
   <Routes>
      <Route path="/" element={<ChatLayout />}>
         <Route index element={<Navigate to="contacts" replace />} />
         <Route path="contacts" element={<ContactLayout />}>
            <Route index element={<EmptyChat />} />
            <Route path=":id" element={<SingleContactPage />} />
         </Route>
         <Route path="channels" element={<ChannelLayout />}>
            <Route index element={<EmptyChat />} />
            <Route path=":id" element={<SingleChannelPage />} />
         </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
   </Routes>
);

function ChatLayout() {
   return (
      <div className="flex md:flex-row flex-col-reverse">
         <NavigationMenu />
         <div className="h-[calc(100vh-75px)] md:h-screen w-full">
            <Outlet />
         </div>
      </div>
   );
}
export default ChatModule;
