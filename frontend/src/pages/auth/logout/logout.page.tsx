import { authService } from "@/store/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/store/store";

export default function useLogoutPage() {
   const { loadings } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();

   const logout = () => {
      dispatch(authService.logout.api()).unwrap();
   };

   return { function: logout, loading: loadings.logout };
}
