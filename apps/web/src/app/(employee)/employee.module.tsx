import { Link, Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import NotFoundPage from "../404/not-found.page";
import OverviewPage from "./overview/overview.page";
import { AsideSheet, Header, RouterLink } from "@/shared/components";
import { Sheet, SheetTrigger } from "@/shared/ui/sheet";
import { BriefcaseBusinessIcon, CalendarIcon, FileClockIcon, GaugeIcon, MenuIcon } from "lucide-react";
import WorkspacesPage from "./workspaces/workspaces.page";
import ApplyLeavePage from "./apply-leave/apply-leave.page";
import AttendancePage from "./attendance/attendance.page";

export default function EmployeeModule() {
   return (
      <Routes>
         <Route element={<EmployeeLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="workspaces" element={<WorkspacesPage />} />
            <Route path="leave" element={<ApplyLeavePage />} />
            <Route path="attendance" element={<AttendancePage />} />
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}

function EmployeeLayout() {
   const { pathname } = useLocation();
   const titles: any = {
      "/employee/overview": "Overview",
      "/employee/workspaces": "Workspaces",
      "/employee/leave": "Leave",
      "/employee/attendance": "Attendance",
   };
   return (
      <main className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] h-full">
         <Sheet>
            <aside className="border-r rounded-none bg-white text-gray-800">
               <AsideSheet>
                  <div className="flex h-full max-h-screen flex-col">
                     <div className="flex items-center px-4 h-[100px]">
                        <Link to="/company" className="flex items-center gap-2">
                           <img //
                              src="https://cdn.prod.website-files.com/655b60964be1a1b36c746790/655b60964be1a1b36c746d41_646dfce3b9c4849f6e401bff_supabase-logo-icon_1.png"
                              alt="logo"
                              width={60}
                              height={60}
                           />
                           <div>
                              <span className="text-3xl block capitalize font-semibold">witmates</span>
                              <span className="text-xs block font-medium">witmates@gmail.com</span>
                           </div>
                        </Link>
                     </div>
                     <nav className="grid items-start text-md md:text-sm font-medium">
                        <RouterLink path="/employee/overview" className="px-3 py-3 transition-all hover:text-primary" activeClass="border-r-4 border-primary bg-gray-100 text-primary" replace>
                           <SheetTrigger className="flex items-center gap-3 capitalize">
                              <GaugeIcon size={18} /> overview
                           </SheetTrigger>
                        </RouterLink>
                        <RouterLink path="/employee/attendance" className="px-3 py-3 transition-all hover:text-primary" activeClass="border-r-4 border-primary bg-gray-100 text-primary" replace>
                           <SheetTrigger className="flex items-center gap-3 capitalize">
                              <FileClockIcon size={20} /> Attendance
                           </SheetTrigger>
                        </RouterLink>
                        <RouterLink path="/employee/workspaces" className="px-3 py-3 transition-all hover:text-primary" activeClass="border-r-4 border-primary bg-gray-100 text-primary" replace>
                           <SheetTrigger className="flex items-center gap-3 capitalize">
                              <BriefcaseBusinessIcon size={20} /> Workspaces
                           </SheetTrigger>
                        </RouterLink>
                        <RouterLink path="/employee/leave" className="px-3 py-3 transition-all hover:text-primary" activeClass="border-r-4 border-primary bg-gray-100 text-primary" replace>
                           <SheetTrigger className="flex items-center gap-3 capitalize">
                              <CalendarIcon size={20} />
                              Leave
                           </SheetTrigger>
                        </RouterLink>
                     </nav>
                  </div>
               </AsideSheet>
            </aside>
            <div className="flex flex-col">
               <Header
                  title={titles[pathname] as string}
                  {...(pathname.includes("overview")
                     ? {
                          prefixItem: (
                             <SheetTrigger className="block md:hidden">
                                <MenuIcon size={23} />
                             </SheetTrigger>
                          ),
                       }
                     : {
                          back: "/employee/overview",
                       })}
               />
               <div //
                  className="overflow-y-scroll p-2 bg-gray-100"
                  style={{ height: "calc(100vh - 65px)" }}>
                  <Outlet />
               </div>
            </div>
         </Sheet>
      </main>
   );
}
