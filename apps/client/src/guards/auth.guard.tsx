import { useAppSelector } from "@/api/store";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
   const { accessToken, session } = useAppSelector((state) => state.authReducer);
   if (!accessToken || !session.data) {
      return <Navigate to="/auth" replace />;
   }

   return <Outlet />;
}
