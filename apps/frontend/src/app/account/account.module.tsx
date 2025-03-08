import { Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import { useMediaQuery } from "@/shared/hooks";
import SettingsMenu from "./partials/SettingsMenu";
import ProfilePage from "./profile/profile.page";
import NotFoundPage from "../404/not-found.page";
import AppInfoPage from "./info/page";

export default function AccountModule() {
   const screen = useMediaQuery();
   return (
      <Routes>
         <Route path="/" element={<AccountLayout />}>
            {screen.md && <Route index element={<Navigate to="profile" replace />} />}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="app-info" element={<AppInfoPage />} />
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}

function AccountLayout() {
   const screen = useMediaQuery();
   const { pathname } = useLocation();

   if (screen.md) {
      return (
         <div className="flex h-full">
            <aside className="md:block w-[300px] border-r border-gray-300">
               <SettingsMenu />
            </aside>
            <main className="flex-1 h-full">
               <Outlet />
            </main>
         </div>
      );
   }
   return (
      <div>
         {pathname?.split("/")[2] ? ( //
            <div>
               <Outlet />
            </div>
         ) : (
            <SettingsMenu />
         )}
      </div>
   );
}
