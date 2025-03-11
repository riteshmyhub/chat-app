import { Navigate, Outlet, Route, Routes } from "react-router";
import NotFoundPage from "../404/not-found.page";
import WorkspacesPage from "./workspaces/workspaces.page";
import WorkspaceLayout from "./[id]/[id].layout";

export default function WorkspaceModule() {
   return (
      <Routes>
         <Route element={<Outlet />}>
            <Route index element={<WorkspacesPage />} />
            <Route path="/:id" element={<WorkspaceLayout />}>
               <Route index element={<Navigate to="overview" replace />} />
               <Route path="overview" element={<p>overview</p>} />
               <Route path="features" element={<p>features</p>} />
               <Route path="sprints" element={<p>sprints</p>} />
               <Route path="stories" element={<p>stories</p>} />
            </Route>
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
