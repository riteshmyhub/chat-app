import { authService } from "@/store/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRegisterController() {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { loadings } = useAppSelector((state) => state.auth);
   const [fields, setFields] = useState({
      email: "",
      password: "",
      confirmPassword: "",
   });

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields({
         ...fields,
         [e.target.name]: e.target.value,
      });
   };

   const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         await dispatch(authService.register.api(fields)).unwrap();
         navigate("/auth/login", { replace: true });
      } catch (error) {
         return;
      }
   };

   return { fields, onChange, submit, loading: loadings.register };
}
