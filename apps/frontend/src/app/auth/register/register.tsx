import { Link } from "react-router";
import useRegisterController from "./register.controller";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Image } from "@/shared/components";
import * as Yup from "yup";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { LoaderIcon, LogInIcon } from "lucide-react";

export default function RegisterPage() {
   const ctrl = useRegisterController();
   return (
      <Formik
         initialValues={ctrl.fields}
         validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required"),
            confirmPassword: Yup.string()
               .oneOf([Yup.ref("password"), ""], "Passwords must match")
               .required("Confirm Password is required"),
         })}
         onSubmit={ctrl.submit}>
         <Form className="w-full h-[100vh] grid grid-cols-12 justify-center">
            {/* Left Section */}
            <div className="col-span-12 md:col-span-6 p-5 md:p-20 bg-gray-300">
               <Image src="/images/login.svg" alt="Image" className="h-full w-full" width={100} height={100} />
            </div>

            {/* Right Section */}
            <div className="col-span-12 md:col-span-6 p-3 flex items-center justify-center">
               <div className="grid grid-cols-12 gap-3 w-full md:w-[60%]">
                  <div className="col-span-12">
                     <span className="text-4xl block mb-3 text-theme-level-5 font-bold text-gray-800">Create Your Account</span>
                  </div>

                  <fieldset className="col-span-12">
                     <Field as={Input} label="Email" type="email" name="email" className="h-12" required />
                     <ErrorMessage name="email" component="small" className="text-red-500 text-xs" />
                  </fieldset>

                  <fieldset className="col-span-12 md:col-span-6">
                     <Field as={Input} label="Password" type="password" name="password" className="h-12" required />
                     <ErrorMessage name="password" component="small" className="text-red-500 text-xs" />
                  </fieldset>

                  <fieldset className="col-span-12 md:col-span-6">
                     <Field as={Input} label="Confirm Password" type="password" name="confirmPassword" className="h-12" required />
                     <ErrorMessage name="confirmPassword" component="small" className="text-red-500 text-xs" />
                  </fieldset>
                  <div className="col-span-12 capitalize text-md">
                     <div>
                        Already have an account?{" "}
                        <Link className="underline" to="../login">
                           Login
                        </Link>
                     </div>
                  </div>

                  <div className="col-span-12">
                     <Button size="lg" type="submit" className="h-12 w-full md:w-auto bg-blue-600 text-white hover:bg-blue-700" disabled={ctrl.loading}>
                        Register
                        {ctrl.loading ? <LoaderIcon size={16} className="animate-spin ml-2" /> : <LogInIcon size={16} className="ml-2" />}
                     </Button>
                  </div>
               </div>
            </div>
         </Form>
      </Formik>
   );
}
