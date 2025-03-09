import { Link } from "react-router";
import useLoginController from "./login.controller";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoaderIcon, LogInIcon } from "lucide-react";
import * as Yup from "yup";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export default function LoginPage() {
   const ctrl = useLoginController();
   return (
      <Formik //
         initialValues={ctrl.fields}
         validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address").required("Email required"),
            password: Yup.string().required("Password required"),
         })}
         onSubmit={ctrl.submit}>
         <Form className="w-full h-[100vh] grid grid-cols-12 justify-center">
            <div className="col-span-12 md:col-span-6 p-5 md:p-20 bg-gray-300">
               <img //
                  src="/images/login.svg"
                  alt="Image"
                  className="h-full w-full"
                  width={90}
                  height={90}
               />
            </div>
            <div className="col-span-12 md:col-span-6 p-3 flex items-center justify-center">
               <div className="grid grid-cols-12 gap-3 w-full md:w-[60%]">
                  <div className="col-span-12">
                     <span className="text-4xl block mb-3 text-theme-level-5 font-bold text-gray-800">Login your Account</span>
                  </div>
                  <fieldset className="col-span-12">
                     <Field as={Input} label="Email" type="email" name="email" className="h-12" required />
                     <ErrorMessage name="email" component="small" className="text-red-500 text-xs" />
                  </fieldset>
                  <fieldset className="col-span-12">
                     <Field as={Input} label="Password" type="password" name="password" className="h-12" required />
                     <ErrorMessage name="password" component="small" className="text-red-500 text-xs" />
                  </fieldset>
                  <fieldset className="col-span-6">
                     <label htmlFor="remember" className="cursor-pointer select-none flex items-center capitalize">
                        <input type="checkbox" name="remember" className="h-4 w-4" id="remember" /> <span className="pl-2 text-md">Remember me</span>
                     </label>
                  </fieldset>
                  <div className="col-span-6 text-end capitalize text-md">
                     <Link to="/auth/forgot-password" className="underline">
                        forgot password
                     </Link>
                  </div>
                  <div className="col-span-12">
                     <Button size="lg" type="submit" variant="theme" className="h-12 w-full md:w-auto uppercase" disabled={ctrl.loading}>
                        Login
                        {ctrl.loading ? ( //
                           <LoaderIcon size={16} className="spin" />
                        ) : (
                           <LogInIcon size={16} />
                        )}
                     </Button>
                  </div>
               </div>
            </div>
         </Form>
      </Formik>
   );
}
