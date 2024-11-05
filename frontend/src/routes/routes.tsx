import PageNotFound from "@/pages/404/page";
import SettingsPage from "@/pages/settings/page";
import LoginPage from "@/pages/auth/login/login";
import RegisterPage from "@/pages/auth/register/register";
import ChannelsPage from "@/pages/channels/page";
import ChatsPage from "@/pages/chats/page";
import NotificationsPage from "@/pages/notifications/page";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MessagesPage from "@/pages/messages/page";
import AuthGuard from "@/guards/auth.guard";
import ProfilePage from "@/pages/settings/profile/page";
import ChatSettingPage from "@/pages/settings/chat/page";
import SoundsPage from "@/pages/settings/sounds/page";
import { useMediaQuery } from "@/hooks";

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
            <Route index element={<Navigate to="chats" replace />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/chats/:chatID" element={<MessagesPage />} />

            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/channels/:chatID" element={<MessagesPage />} />

            <Route path="/notifications" element={<NotificationsPage />} />

            <Route path="/settings" element={<SettingsPage />}>
               {screen.md && <Route index element={<Navigate to="profile" replace />} />}
               <Route path="profile" element={<ProfilePage />} />
               <Route path="chat" element={<ChatSettingPage />} />
               <Route path="sounds" element={<SoundsPage />} />
            </Route>
         </Route>

         <Route path="*" element={<PageNotFound />} />
      </Routes>
   );
}
