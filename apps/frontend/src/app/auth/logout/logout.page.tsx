import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";

export default function useLogoutPage() {
   const { logout: method } = useAppSelector((state) => state.authReducer);
   const dispatch = useAppDispatch();

   const logout = () => {
      dispatch(authService.logout.api()).unwrap();
   };

   return { function: logout, loading: method.isLoading };
}

