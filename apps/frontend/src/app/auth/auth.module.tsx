import { Navigate, Outlet, Route, Routes } from "react-router";
import LoginPage from "./login/login.page";
import RegisterPage from "./register/register";
import ForgotPasswordPage from "./forgot-password/forgot-password.page";

const AuthModule = () => (
   <Routes>
      <Route path="/" element={<Outlet />}>
         <Route index element={<Navigate to="login" replace />} />
         <Route path="login" element={<LoginPage />} />
         <Route path="register" element={<RegisterPage />} />
         <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
   </Routes>
);

export default AuthModule;
