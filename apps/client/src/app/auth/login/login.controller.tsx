import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function useLoginController() {
   const dispatch = useAppDispatch();
   const { login, deviceToken } = useAppSelector((state) => state.authReducer);
   const [fields, setFields] = useState({ email: "", password: "" });
   const navigate = useNavigate();

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields({
         ...fields,
         [e.target.name]: e.target.value,
      });
   };

   const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         await dispatch(authService.login.api({ ...fields, deviceToken: deviceToken.data })).unwrap();
         navigate("/", { replace: true });
      } catch (error) {
         return;
      }
   };

   return { fields, onChange, submit, loading: login.isLoading };
}
