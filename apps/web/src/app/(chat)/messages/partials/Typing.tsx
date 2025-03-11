import { useAppSelector } from "@/api/store";
import { AvatarProfile } from "@/shared/components";

export default function Typing() {
   const { typing } = useAppSelector((state) => state.chatReducer);
   if (!typing) {
      return "";
   }
   return (
      <div className="flex items-center space-x-3 py-2">
         {/* Avatar */}
         <AvatarProfile //
            src={typing?.avatar}
            fallBackTxt={typing?.name}
            height="40px"
            width="40px"
         />

         {/* Name and Typing Indicator */}
         <div>
            <div className="text-red-600 text-xs font-semibold mb-4">{typing?.name}</div>
            <div className="flex items-center space-x-1 text-gray-600">
               <div className="flex space-x-1">
                  <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-400"></span>
               </div>
            </div>
         </div>
      </div>
   );
}
