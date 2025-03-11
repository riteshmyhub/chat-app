import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router";

export default function useRegisterController() {
   const dispatch = useAppDispatch();
   const { register } = useAppSelector((state) => state.authReducer);
   const fields = { email: "", password: "", confirmPassword: "" };
   const navigate = useNavigate();
   const submit = async (values: any, formikHelpers: FormikHelpers<any>) => {
      try {
         await dispatch(authService.register.api(values)).unwrap();
         formikHelpers.resetForm();
         navigate("/", { replace: true });
      } catch (error) {
         return;
      }
   };

   return { fields, submit, loading: register.isLoading };
}
