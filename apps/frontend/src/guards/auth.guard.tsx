import ProfilePage from "@/pages/settings/profile/page";
import { useAppSelector } from "@/store/store";
import { Card } from "@/ui/card";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthGuard() {
   const location = useLocation();
   const { authUser } = useAppSelector((state) => state.auth);
   if (!authUser) {
      return <Navigate to="/auth" state={{ form: location }} replace />;
   }
   if (!authUser?.profile) {
      return (
         <div className="h-screen absolute top-0 left-0 bg-white z-20 flex items-end md:items-center justify-center w-full">
            <Card className="max-w-[600px]">
               <ProfilePage />
            </Card>
         </div>
      );
   }
   return <Outlet />;
}
