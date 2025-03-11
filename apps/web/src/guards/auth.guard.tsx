import { useAppSelector } from "@/api/store";
import ProfilePage from "@/app/account/profile/profile.page";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
   const { accessToken, session } = useAppSelector((state) => state.authReducer);
   if (!accessToken || !session.data) {
      return <Navigate to="/auth" replace />;
   }
   if (!session.data?.profile?.first_name) {
      return (
         <div className="h-screen absolute top-0 left-0 bg-gray-200 z-20 flex items-end md:items-center justify-center w-full overflow-y-auto">
            <div className="md:w-[600px] bg-white rounded-xl">
               <ProfilePage createProfile />
            </div>
         </div>
      );
   }
   return <Outlet />;
}
