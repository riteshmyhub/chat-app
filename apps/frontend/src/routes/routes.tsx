import LoginPage from "@/pages/auth/login/login";
import RegisterPage from "@/pages/auth/register/register";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AuthGuard from "@/guards/auth.guard";
import HomePage from "@/pages/home/page";
import NotFoundPage from "@/pages/404/page";

export default function AppRoutes() {
   return (
      <Routes>
         <Route path="auth" element={<Outlet />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
         </Route>

         <Route element={<AuthGuard />}>
            <Route path="/" element={<HomePage />} />
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
