import LoginPage from "@/pages/auth/login/login";
import RegisterPage from "@/pages/auth/register/register";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AuthGuard from "@/guards/auth.guard";
import NotFoundPage from "@/pages/404/page";
import { useMediaQuery } from "@/hooks";
import SettingsLayout from "@/pages/settings/settings.layout";
import ProfilePage from "@/pages/settings/profile/page";
import ChatSettingPage from "@/pages/settings/chat/page";
import SoundsPage from "@/pages/settings/sounds/page";
import ContactLayout from "@/pages/contact/contact.layout";
import NotificationsPage from "@/pages/notifications/page";
import SingleChannelPage from "@/pages/channel/[id]/page";
import SingleContactPage from "@/pages/contact/[id]/page";
import { EmptyChat } from "@/components";
import ChannelLayout from "@/pages/channel/channel.layout";
import AppInfoPage from "@/pages/settings/info/page";

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
            <Route path="contacts" element={<ContactLayout />}>
               <Route index element={<EmptyChat />} />
               <Route path=":id" element={<SingleContactPage />} />
            </Route>
            <Route path="channels" element={<ChannelLayout />}>
               <Route index element={<EmptyChat />} />
               <Route path=":id" element={<SingleChannelPage />} />
            </Route>

            <Route path="settings" element={<SettingsLayout />}>
               {screen.md && <Route index element={<Navigate to="profile" replace />} />}
               <Route path="profile" element={<ProfilePage />} />
               <Route path="chat" element={<ChatSettingPage />} />
               <Route path="sounds" element={<SoundsPage />} />
               <Route path="app-info" element={<AppInfoPage />} />
            </Route>
            <Route path="notifications" element={<NotificationsPage />} />
         </Route>

         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
