import { useAppSelector } from "@/store/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthGuard() {
   const location = useLocation();
   const { authUser } = useAppSelector((state) => state.auth);
   if (!authUser) {
      return <Navigate to="/auth" state={{ form: location }} replace />;
   }
   if (!authUser?.profile) {
      return <div>profile</div>;
   }
   return <Outlet />;
}
