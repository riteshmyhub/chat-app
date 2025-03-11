import { DigitalTimer } from "@/shared/components";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { ChevronRightIcon, LoaderIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function ForgotPasswordPage() {
   return (
      <form className="w-full h-[100vh] grid grid-cols-12 justify-center" autoComplete="off">
         <div className="col-span-12 md:col-span-6 p-5 md:p-20 bg-gray-300">
            <img //
               src="/images/forgot-password.svg"
               alt="Image"
               className="h-full w-full"
               width={100}
               height={100}
            />
         </div>
         <div className="col-span-12 md:col-span-6 p-3 flex items-center justify-center">
            <div className="grid grid-cols-12 gap-3 w-full md:w-[60%]">
               {/* Forgot Password */}
               {true ? (
                  <React.Fragment>
                     <div className="col-span-12">
                        <span className="text-4xl block mb-3 text-theme-level-5 font-bold text-gray-800">Forgot Password</span>
                     </div>
                     <div className="col-span-12">
                        <Input type="email" label="Email" name="email" className="h-12" required />
                     </div>
                     <div className="col-span-12 text-end capitalize text-md">
                        <Link to="../login" className="underline" replace>
                           back to login
                        </Link>
                     </div>
                     <div className="col-span-12">
                        <Button className="h-12 w-full md:w-auto uppercase" variant="theme" size="lg" type="submit">
                           Send Otp
                           {true ? ( //
                              <LoaderIcon size={16} className="spin" />
                           ) : (
                              <ChevronRightIcon size={16} />
                           )}
                        </Button>
                     </div>
                  </React.Fragment>
               ) : (
                  <React.Fragment>
                     <div className="col-span-12">
                        <span className="text-3xl block mb-3 text-theme-level-5 font-bold text-gray-800">Reset Password</span>
                     </div>
                     <div className="col-span-12">
                        <Input type="text" label="New Password" name="password" className="h-12" required />
                     </div>
                     <div className="col-span-12">
                        <Input type="text" label="Confirm Password" name="confirm_password" className="h-12" required />
                     </div>
                     <div className="col-span-12">
                        <Input type="text" label="Otp" name="otp" className="h-12" maxLength={4} required />
                        <span className="mt-3 block text-xs">
                           OTP will expire in <DigitalTimer sec={200} callback={() => null} />
                        </span>
                     </div>
                     <div className="col-span-12">
                        <Button size="lg" type="submit" variant="theme" className="h-12 w-full uppercase md:w-auto">
                           Reset password
                           {true ? ( //
                              <LoaderIcon size={16} className="spin" />
                           ) : (
                              <ChevronRightIcon size={16} />
                           )}
                        </Button>
                     </div>
                  </React.Fragment>
               )}
            </div>
         </div>
      </form>
   );
}
