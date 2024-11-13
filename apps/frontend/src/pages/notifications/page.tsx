import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { Badge } from "@/ui/badge";
import { MessageCircleIcon, UserPlusIcon, UserXIcon } from "lucide-react";

export default function NotificationsPage() {
   return (
      <div className="p-2 overflow-y-auto h-full">
         <div className="text-center my-3">
            <Badge variant="outline">Nov 12, 2024</Badge>
         </div>
         <Alert className="mb-2 block md:flex justify-between items-center">
            <div className="flex items-center">
               <MessageCircleIcon className="h-5 w-5 mr-5" />
               <div>
                  <AlertTitle>New Message</AlertTitle>
                  <AlertDescription>You have a new message in your conversation with John Doe.</AlertDescription>
               </div>
            </div>
            <div className="text-xs text-gray-500">10:30 AM</div>
         </Alert>

         <Alert className="mb-2 block md:flex justify-between items-center">
            <div className="flex items-center">
               <MessageCircleIcon className="h-5 w-5 mr-5" />
               <div>
                  <AlertTitle>Group Chat Update</AlertTitle>
                  <AlertDescription>You have been added to the "Work Team" group chat.</AlertDescription>
               </div>
            </div>
            <div className="text-xs text-gray-500">10:32 AM</div>
         </Alert>

         {/* New Notifications for Chat Updates */}
         <Alert className="mb-2 block md:flex justify-between items-center">
            <div className="flex items-center">
               <MessageCircleIcon className="h-5 w-5 mr-5" />
               <div>
                  <AlertTitle>Message Unread</AlertTitle>
                  <AlertDescription>Your message in the "Project X" chat is still unread by Jane Smith.</AlertDescription>
               </div>
            </div>
            <div className="text-xs text-gray-500">11:00 AM</div>
         </Alert>

         <Alert className="mb-2 block md:flex justify-between items-center">
            <div className="flex items-center">
               <MessageCircleIcon className="h-5 w-5 mr-5" />
               <div>
                  <AlertTitle>New Group Message</AlertTitle>
                  <AlertDescription>You have a new message in the "Family Chat" group.</AlertDescription>
               </div>
            </div>
            <div className="text-xs text-gray-500">11:15 AM</div>
         </Alert>

         <Alert className="mb-2 block md:flex justify-between items-center">
            <div className="flex items-center">
               <MessageCircleIcon className="h-5 w-5 mr-5" />
               <div>
                  <AlertTitle>Message Replied</AlertTitle>
                  <AlertDescription>Someone replied to your message in the "Work Team" group chat.</AlertDescription>
               </div>
            </div>
            <div className="text-xs text-gray-500">11:25 AM</div>
         </Alert>

         <div className="text-center my-3">
            <Badge variant="outline">Nov 13, 2024</Badge>
         </div>

         <Alert className="mb-2 block md:flex justify-between items-center">
            <div className="flex items-center">
               <MessageCircleIcon className="h-5 w-5 mr-5" />
               <div>
                  <AlertTitle>Message Read</AlertTitle>
                  <AlertDescription>Your message in the "Project X" chat was read by Jane Smith.</AlertDescription>
               </div>
            </div>
            <div className="text-xs text-gray-500">0:35 AM</div>
         </Alert>

         {/* Request Accepted Notification */}
         <Alert className="mb-2 block md:flex justify-between items-center">
            <div className="flex items-center">
               <UserPlusIcon className="h-5 w-5 mr-5" />
               <div>
                  <AlertTitle>Request Accepted</AlertTitle>
                  <AlertDescription>Your friend request to Sarah Johnson has been accepted.</AlertDescription>
               </div>
            </div>
            <div className="text-xs text-gray-500">10:40 AM</div>
         </Alert>

         <div className="text-center my-3">
            <Badge variant="outline">today</Badge>
         </div>

         {/* Request Rejected Notification */}
         <Alert className="mb-2 block md:flex justify-between items-center">
            <div className="flex items-center">
               <UserXIcon className="h-5 w-5 mr-5" />
               <div>
                  <AlertTitle>Request Rejected</AlertTitle>
                  <AlertDescription>Your invitation to join the group "Work Team" has been rejected by Alice.</AlertDescription>
               </div>
            </div>
            <div className="text-xs text-gray-500">10:42 AM</div>
         </Alert>

         {/* Request Accept Button Example */}
         <Alert className="flex items-center gap-5">
            <div>
               <UserPlusIcon className="h-5 w-5" />
            </div>
            <div className="w-full">
               <div className="flex justify-between">
                  <AlertTitle>Friend Request</AlertTitle>
                  <div className="text-xs text-gray-500">10:45 AM</div>
               </div>
               <AlertDescription>You have a new friend request from John Doe.</AlertDescription>
               <div className="mt-2 flex space-x-2">
                  <button className="px-4 py-1 bg-green-500 text-white rounded text-xs">Accept</button>
                  <button className="px-4 py-1 bg-gray-300 text-black rounded  text-xs">Reject</button>
               </div>
            </div>
         </Alert>
      </div>
   );
}
