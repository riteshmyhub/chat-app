import NotFoundPage from "@/app/404/not-found.page";
import AuthModule from "@/app/auth/auth.module";
import ChatModule from "@/app/chat/chat.module";
import AuthGuard from "@/guards/auth.guard";
import { Navigate, Route, Routes } from "react-router";

export default function AppRoutes() {
   return (
      <Routes>
         <Route path="auth/*" element={<AuthModule />} />
         <Route element={<AuthGuard />}>
            <Route index element={<Navigate to="chat" replace />} />
            <Route path="chat/*" element={<ChatModule />} />
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
