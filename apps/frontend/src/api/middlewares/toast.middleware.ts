import { Middleware } from "@reduxjs/toolkit";

//=store=>(next)
const toastMiddleware: Middleware = (_) => (next) => (action: any) => {
   if (action?.type.endsWith("/fulfilled") && !action?.type?.includes("*")) {
      alert(action?.payload?.message);
   }
   if (action?.type.endsWith("/rejected") && !action?.type?.includes("*")) {
      alert(action?.payload?.message);
   }
   return next(action);
};

export default toastMiddleware;
