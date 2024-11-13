import LoginPage from "@/pages/auth/login/login";
import RegisterPage from "@/pages/auth/register/register";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AuthGuard from "@/guards/auth.guard";
import NotFoundPage from "@/pages/404/page";
import { useMediaQuery } from "@/hooks";
import SettingsPage from "@/pages/settings/page";
import ProfilePage from "@/pages/settings/profile/page";
import ChatSettingPage from "@/pages/settings/chat/page";
import SoundsPage from "@/pages/settings/sounds/page";
import ContactsPage from "@/pages/contacts/page";
import ChannelsPage from "@/pages/channels/page";
import MessagesPage from "@/pages/messages/page";

export default function AppRoutes() {
   const screen = useMediaQuery();
   return (
      <Routes>
         <Route path="auth" element={<Outlet />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
         </Route>

         <Route element={<AuthGuard />}>
            <Route index element={<Navigate to="contacts" replace />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="channels" element={<ChannelsPage />} />
            <Route path="chat/:id" element={<MessagesPage />} />

            <Route path="/settings" element={<SettingsPage />}>
               {screen.md && <Route index element={<Navigate to="profile" replace />} />}
               <Route path="profile" element={<ProfilePage />} />
               <Route path="chat" element={<ChatSettingPage />} />
               <Route path="sounds" element={<SoundsPage />} />
            </Route>
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
