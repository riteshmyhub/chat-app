import { channelService } from "@/store/services/channel.service";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import ChannelsPage from "./channels/channels.page";
import { useMediaQuery } from "@/hooks";

export default function ChannelLayout() {
   const dispatch = useAppDispatch();
   const { id } = useParams();
   const screen = useMediaQuery();

   useEffect(() => {
      dispatch(channelService.getChannels.api());
      return () => {};
   }, []);

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
