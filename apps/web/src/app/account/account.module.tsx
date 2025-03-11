import { Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import { useMediaQuery } from "@/shared/hooks";
import SettingsMenu from "./partials/SettingsMenu";
import ProfilePage from "./profile/profile.page";
import NotFoundPage from "../404/not-found.page";
import AppInfoPage from "./info/page";
import { Header } from "@/shared/components";

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
const titles: any = {
   "/account/app-info": "App Info",
   "/account/profile": "Profile",
};
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
               <Header title={titles[pathname]} back="/account" />
               <div className="overflow-y-auto" style={{ height: "calc(100vh - 65px)" }}>
                  <Outlet />
               </div>
            </main>
         </div>
      );
   }
   return (
      <div>
         {pathname?.split("/")[2] ? ( //
            <>
               <Header title={titles[pathname]} back="/account" />
               <div className="overflow-y-auto" style={{ height: "calc(100vh - 65px)" }}>
                  <Outlet />
               </div>
            </>
         ) : (
            <SettingsMenu />
         )}
      </div>
   );
}
