import { Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//=store=>(next)
const toastMiddleware: Middleware = (_) => (next) => (action: any) => {
   if (action?.type.endsWith("/fulfilled") && !action?.type?.includes("*")) {
      toast.success(`${action?.payload?.message}`);
   }
   if (action?.type.endsWith("/rejected") && !action?.type?.includes("*")) {
      toast.error(`${action?.payload?.message}`);
   }
   return next(action);
};

export default toastMiddleware;
