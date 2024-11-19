import { useAppSelector } from "@/store/store";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { BellIcon } from "lucide-react";

export default function NotificationsPage() {
   const { notifications, loadings } = useAppSelector((state) => state.auth);

   if (loadings.getNotifications) {
      return <div>loading...</div>;
   }
   return (
      <div className="p-2 overflow-y-auto h-full">
         {notifications?.map((notification) => {
            return (
               <Alert key={notification._id} className="flex items-center gap-5 mb-3">
                  <div>
                     <BellIcon className="h-5 w-5" />
                  </div>
                  <div className="w-full">
                     <div className="flex justify-between">
                        <AlertTitle>{notification?.title}</AlertTitle>
                        <div className="text-xs text-gray-500">{new Date(notification.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                     </div>
                     <AlertDescription>{notification?.body}.</AlertDescription>
                  </div>
               </Alert>
            );
         })}
      </div>
   );
}
