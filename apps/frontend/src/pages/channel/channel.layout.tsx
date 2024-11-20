import { Outlet, useParams } from "react-router-dom";
import ChannelsPage from "./channels/channels.page";
import { useMediaQuery } from "@/hooks";

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
