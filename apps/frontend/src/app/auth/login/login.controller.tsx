import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router";

export default function useLoginController() {
   const dispatch = useAppDispatch();
   const { login, deviceToken } = useAppSelector((state) => state.authReducer);
   const fields = { email: "", password: "" };
   const navigate = useNavigate();

   const submit = async (values: any, formikHelpers: FormikHelpers<any>) => {
      try {
         await dispatch(authService.login.api({ ...values, deviceToken: deviceToken.data })).unwrap();
         formikHelpers.resetForm();
         navigate("/contacts", { replace: true });
      } catch (error) {
         return;
      }
   };

   return { fields, submit, loading: login.isLoading };
}
