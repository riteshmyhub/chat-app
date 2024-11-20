import { Navbar } from "@/components";
import { authService } from "@/store/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { Button } from "@/ui/button";
import { BellIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotificationsPage() {
   const { notifications, loadings } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();
   const deleteNotification = (payload: { id?: string; all?: boolean }) => {
      dispatch(authService.deleteNotification.api(payload));
   };

   if (loadings.getNotifications) {
      return <div>loading...</div>;
   }
   if (!notifications?.length) {
      return (
         <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
            <img src="/images/empty-notifications.webp" alt="empty-notifications" className="w-48 h-48 object-cover mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Notifications</h3>
            <p className="text-gray-600 text-center">You don't have any new notifications at the moment.</p>
         </div>
      );
   }
   return (
      <>
         <div className="overflow-y-auto h-full">
            <Navbar //
               title={<b>Notifications</b>}
               back={"/contacts"}
               extra={
                  <Button size="sm" variant="destructive" onClick={() => deleteNotification({ all: true })}>
                     Clear all
                  </Button>
               }
            />
            <div className="p-2">
               {notifications?.map((notification) => {
                  return (
                     <Alert key={notification?._id} className="flex items-center gap-6 mb-3">
                        <div>
                           <BellIcon className="h-6 w-6" />
                        </div>
                        <div className="w-full">
                           <div className="flex justify-between">
                              <AlertTitle className="hover:underline">
                                 <Link to={`${notification?.url}`}>{notification?.title}</Link>
                              </AlertTitle>
                              <div className="text-xs text-gray-500">{new Date(notification.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                           </div>
                           <AlertDescription>{notification?.body}.</AlertDescription>
                        </div>
                        <div>
                           <XIcon //
                              size={17}
                              className="text-red-500"
                              role="button"
                              onClick={() => deleteNotification({ id: notification?._id })}
                           />
                        </div>
                     </Alert>
                  );
               })}
            </div>
         </div>
      </>
   );
}
