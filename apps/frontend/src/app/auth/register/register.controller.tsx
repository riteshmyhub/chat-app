import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { FormikHelpers } from "formik";

export default function useRegisterController() {
   const dispatch = useAppDispatch();
   const { register } = useAppSelector((state) => state.authReducer);
   const fields = { email: "", password: "", confirmPassword: "" };

   const submit = async (values: any, formikHelpers: FormikHelpers<any>) => {
      try {
         await dispatch(authService.register.api(values)).unwrap();
         formikHelpers.resetForm();
      } catch (error) {
         return;
      }
   };

   return { fields, submit, loading: register.isLoading };
}
