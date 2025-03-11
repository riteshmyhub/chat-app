import NotFoundPage from "@/app/404/not-found.page";
import AuthModule from "@/app/auth/auth.module";
import ChatModule from "@/app/chat/chat.module";
import AccountModule from "@/app/account/account.module";
import AuthGuard from "@/guards/auth.guard";
import { Route, Routes } from "react-router";
import HomePage from "./home/home.page";

export default function AppRoutes() {
   return (
      <Routes>
         <Route path="auth/*" element={<AuthModule />} />
         <Route element={<AuthGuard />}>
            <Route index element={<HomePage />} />
            <Route path="chat/*" element={<ChatModule />} />
            <Route path="account/*" element={<AccountModule />} />
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
