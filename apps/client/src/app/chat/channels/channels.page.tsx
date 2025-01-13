import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router";

export default function ChannelsPage() {
   return (
      <div>
         {/* contacts */}
         <Link role="button" to="/chat/1" className="flex items-center p-2 px-3 gap-3 hover:bg-[#F0F2F5] border-b-[1px]">
            <div className="basis-1/4 flex justify-center">
               <Avatar className="h-[50px] w-[50px] relative inline-block overflow-visible" data-online>
                  <AvatarImage src="https://cdn.vectorstock.com/i/1000v/24/27/people-group-avatar-character-vector-12392427.jpg" className="rounded-full" />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
            </div>
            <div className="basis-1/2">
               <span className="block text-lg font-normal">BE developer</span>
               <span className="block text-xs font-medium">@all ?</span>
            </div>
            <div className="basis-1/4 flex justify-center items-center">
               <span data-badge={4} />
            </div>
         </Link>
      </div>
   );
}
