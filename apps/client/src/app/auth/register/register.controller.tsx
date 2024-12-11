import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import React, { useState } from "react";

export default function useRegisterController() {
   const dispatch = useAppDispatch();
   const { register } = useAppSelector((state) => state.authReducer);
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
      } catch (error) {
         return;
      }
   };

   return { fields, onChange, submit, loading: register.isLoading };
}
