import { useMediaQuery } from "@/shared/hooks";
import { Outlet, useParams } from "react-router";
import ChannelsPage from "./channels/channels.page";

export default function ChannelLayout() {
   const { id } = useParams();
   const screen = useMediaQuery();

   if (screen.md) {
      return (
         <div className="flex h-full">
            <aside className="md:block w-[350px] border-r border-gray-300">
               <ChannelsPage />
            </aside>
            <main className="flex-1 h-full">
               <Outlet />
            </main>
         </div>
      );
   }

   return id ? <Outlet /> : <ChannelsPage />;
}
