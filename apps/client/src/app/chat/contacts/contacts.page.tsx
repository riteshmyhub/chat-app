import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router";
import SearchPage from "./search/search.page";

export default function ContactsPage() {
   return (
      <div>
         <span className="text-2xl font-medium capitalize block p-2">chats</span>
         <SearchPage />

         {/* contacts */}
         <Link role="button" to="/chat/12" className="flex items-center p-2 px-3 gap-3 hover:bg-[#F0F2F5] border-b-[1px]">
            <div className="basis-1/4 flex justify-center">
               <Avatar className="h-[50px] w-[50px] relative inline-block overflow-visible" data-online>
                  <AvatarImage src="https://github.com/shadcn.png" className="rounded-full" />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
            </div>
            <div className="basis-1/2">
               <span className="block text-lg font-normal">Test User</span>
            </div>
            <div className="basis-1/4 flex justify-center items-center">
               <span data-badge={4} />
            </div>
         </Link>
      </div>
   );
}
