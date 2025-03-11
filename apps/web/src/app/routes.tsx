import NotFoundPage from "@/app/404/not-found.page";
import AuthModule from "@/app/auth/auth.module";
import ChatModule from "@/app/(chat)/chat.module";
import AccountModule from "@/app/account/account.module";
import AuthGuard from "@/guards/auth.guard";
import { Navigate, Route, Routes } from "react-router";
import EmployeeModule from "./(employee)/employee.module";
import WorkspaceModule from "./(workspace)/workspace.module";

export default function AppRoutes() {
   return (
      <Routes>
         <Route path="auth/*" element={<AuthModule />} />
         <Route element={<AuthGuard />}>
            <Route index element={<Navigate to="employee" replace />} />
            <Route path="employee/*" element={<EmployeeModule />} />
            <Route path="chat/*" element={<ChatModule />} />
            <Route path="workspaces/*" element={<WorkspaceModule />} />
            <Route path="account/*" element={<AccountModule />} />
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
