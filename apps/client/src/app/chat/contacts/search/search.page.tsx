import { SearchIcon } from "lucide-react";

export default function SearchPage() {
   return (
      <>
         <div className="p-2">
            <button className="border w-full text-start p-3 text-gray-400 text-sm flex justify-between items-center">
               Search New Contacts <SearchIcon size={18} />
            </button>
         </div>
      </>
   );
}
