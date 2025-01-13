import React from "react";

export default function Typing() {
   return (
      <div className="flex items-center space-x-3 py-2">
         {/* Avatar */}
         <img
            src="https://res.cloudinary.com/project-buddy/image/upload/v1731951237/users/673b2215a25734e8e39c8413/673b2215a25734e8e39c8413.png"
            alt="avatar"
            className="rounded-full h-10 w-10 object-contain border"
         />

         {/* Name and Typing Indicator */}
         <div>
            <div className="text-red-600 text-xs font-semibold mb-4">admin user</div>
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
