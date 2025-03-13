import { Navigate, Outlet, Route, Routes } from "react-router";
import NotFoundPage from "../404/not-found.page";
import WorkspacesPage from "./workspaces/workspaces.page";
import WorkspaceLayout from "./[id]/[id].layout";
import WorkspaceOverviewPage from "./[id]/overview/workspace-overview.page";
import WorkspaceFeaturesPage from "./[id]/features/workspace-features.page";
import WorkspaceSprintsPage from "./[id]/sprints/workspace-sprints.page";

export default function WorkspaceModule() {
   return (
      <Routes>
         <Route element={<Outlet />}>
            <Route index element={<WorkspacesPage />} />
            <Route path="/:id" element={<WorkspaceLayout />}>
               <Route index element={<Navigate to="overview" replace />} />
               <Route path="overview" element={<WorkspaceOverviewPage />} />
               <Route path="features" element={<WorkspaceFeaturesPage />} />
               <Route path="sprints" element={<WorkspaceSprintsPage />} />
               <Route path="stories" element={<p>stories</p>} />
            </Route>
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
