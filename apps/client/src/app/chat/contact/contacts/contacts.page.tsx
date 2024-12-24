import { Avatar } from "@/shared/components";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router";

export default function ContactsPage() {
   return (
      <div>
         <span className="text-2xl font-medium capitalize block p-2">contacts</span>
         <div className="p-2">
            <button className="border w-full text-start p-3 text-gray-400 text-sm flex justify-between items-center">
               Search New Contacts <SearchIcon size={18} />
            </button>
         </div>

         {/* contacts */}
         <Link role="button" to="/chat/contacts/12" className="flex items-center p-2 px-3 gap-3 hover:bg-[#F0F2F5] border-b-[1px]">
            <div className="basis-1/4 flex justify-center">
               <Avatar //
                  src="https://mui.com/static/images/avatar/2.jpg"
                  className="rounded-full"
                  alt="test user"
                  size="60px"
                  isOnline
               />
            </div>
            <div className="basis-1/2">
               <span className="block text-lg font-normal">Test User</span>
               <span className="block text-xs font-medium text-gray-600">hlw</span>
            </div>
            <div className="basis-1/4 flex justify-center items-center">
               <span data-badge={4} />
            </div>
         </Link>
      </div>
   );
}
