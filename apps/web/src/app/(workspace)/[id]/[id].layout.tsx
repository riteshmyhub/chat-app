import { Outlet, useLocation } from "react-router";
import { BookAIcon, GaugeIcon, MenuIcon, PencilRulerIcon, RouteIcon, TableOfContentsIcon } from "lucide-react";
import { AsideSheet, Header, RouterLink } from "@/shared/components";
import { Sheet, SheetTrigger } from "@/shared/ui/sheet";
import { useMemo } from "react";
import { Progress } from "@/shared/ui/progress";
import projectMock from "./mocks/projects";

export default function WorkspaceLayout() {
   const { pathname } = useLocation();

   const percentage = useMemo(() => {
      const total_sprints = projectMock?.sprints ?? [];
      const completed_sprints = total_sprints.filter((sprint) => sprint.isCompleted);
      return total_sprints.length > 0 ? Math.min((completed_sprints.length / total_sprints.length) * 100, 100) : 0;
   }, [projectMock]);

   const title = useMemo(() => {
      switch (true) {
         case pathname.includes("/sprints"):
            return "Sprints";
         case pathname.includes("/stories"):
            return "Stories";
         case pathname.includes("/features"):
            return "Features";
         default:
            return "Overview";
      }
   }, [pathname]);

   return (
      <main className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] h-full">
         <Sheet>
            <aside className="border-r rounded-none bg-[#F6F8FA] text-gray-800">
               <AsideSheet>
                  <div className="flex h-full max-h-screen flex-col p-2">
                     <div className="bg-white p-2 rounded-lg">
                        <div className="flex items-center justify-start gap-2  ">
                           <div className="bg-black text-white h-[40px] w-[40px] rounded-lg flex justify-center items-center">
                              <PencilRulerIcon size={20} />
                           </div>
                           <div>
                              <span className="text-md block capitalize font-bold">UPI zone</span>
                              <span className="text-xs block font-medium">mobile</span>
                           </div>
                        </div>
                        <div className="flex items-center mt-1 gap-3">
                           <span className="text-xs font-semibold">{percentage.toFixed()}%</span>
                           <Progress value={percentage} className="w-full h-1 " />
                        </div>
                     </div>
                     <nav className="grid items-start text-md md:text-sm font-medium mt-5">
                        <RouterLink //
                           path="overview"
                           className="px-3 py-3 transition-all hover:text-primary rounded-lg"
                           activeClass="bg-white bg-gray-100 text-primary"
                           replace>
                           <SheetTrigger className="flex items-center gap-3 capitalize">
                              <GaugeIcon size={18} /> overview
                           </SheetTrigger>
                        </RouterLink>
                        <RouterLink //
                           path="sprints"
                           className="px-3 py-3 transition-all hover:text-primary rounded-lg"
                           activeClass="bg-white bg-gray-100 text-primary"
                           replace>
                           <SheetTrigger className="flex items-center gap-3 capitalize">
                              <RouteIcon size={18} /> sprints
                           </SheetTrigger>
                        </RouterLink>
                        <RouterLink //
                           path="features"
                           className="px-3 py-3 transition-all hover:text-primary rounded-lg"
                           activeClass="bg-white bg-gray-100 text-primary"
                           replace>
                           <SheetTrigger className="flex items-center gap-3 capitalize">
                              <TableOfContentsIcon size={18} /> features
                           </SheetTrigger>
                        </RouterLink>
                        <RouterLink //
                           path="stories"
                           className="px-3 py-3 transition-all hover:text-primary rounded-lg"
                           activeClass="bg-white bg-gray-100 text-primary"
                           replace>
                           <SheetTrigger className="flex items-center gap-3 capitalize">
                              <BookAIcon size={18} /> stories
                           </SheetTrigger>
                        </RouterLink>
                     </nav>
                  </div>
               </AsideSheet>
            </aside>
            <div className="flex flex-col">
               <Header
                  title={title}
                  {...(pathname.includes("overview")
                     ? {
                          prefixItem: (
                             <SheetTrigger className="block md:hidden">
                                <MenuIcon size={23} />
                             </SheetTrigger>
                          ),
                       }
                     : {
                          back: "overview",
                       })}
               />
               <div //
                  className="overflow-y-scroll p-2 bg-white"
                  style={{ height: "calc(100vh - 65px)" }}>
                  <Outlet />
               </div>
            </div>
         </Sheet>
      </main>
   );
}
