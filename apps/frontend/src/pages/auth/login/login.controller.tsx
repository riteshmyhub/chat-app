import { authService } from "@/store/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useLoginController() {
   const dispatch = useAppDispatch();
   const { loadings } = useAppSelector((state) => state.auth);
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
         await dispatch(authService.login.api(fields)).unwrap();
         navigate("/", { replace: true });
      } catch (error) {
         return;
      }
   };

   return { fields, onChange, submit, loading: loadings.login };
}
