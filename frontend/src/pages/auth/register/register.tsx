import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Link } from "react-router-dom";
import useRegisterController from "./register.controller";
import { LoaderCircleIcon } from "lucide-react";

export default function RegisterPage() {
   const ctrl = useRegisterController();
   return (
      <form onSubmit={ctrl.submit} className="flex h-screen w-full items-end md:items-center justify-center">
         <Card className="mx-auto w-full md:w-[30%]">
            <CardHeader>
               <CardTitle className="text-2xl">Register</CardTitle>
               <CardDescription>Enter your details below to create a new account</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <Label htmlFor="email">Email</Label>
                     <Input //
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        autoComplete="off"
                        onChange={ctrl.onChange}
                        value={ctrl.fields.email}
                        required
                     />
                  </div>
                  <div className="grid gap-2">
                     <Label htmlFor="password">Password</Label>
                     <Input //
                        id="password"
                        name="password"
                        type="text"
                        placeholder="password"
                        autoComplete="off"
                        onChange={ctrl.onChange}
                        value={ctrl.fields.password}
                        required
                     />
                  </div>
                  <div className="grid gap-2">
                     <Label htmlFor="confirmPassword">Confirm Password</Label>
                     <Input //
                        id="confirmPassword"
                        type="text"
                        name="confirmPassword"
                        placeholder="confirm password"
                        autoComplete="off"
                        onChange={ctrl.onChange}
                        value={ctrl.fields.confirmPassword}
                        required
                     />
                  </div>
                  <Button type="submit" className="w-full" disabled={ctrl.loading}>
                     Register
                     {ctrl.loading ? <LoaderCircleIcon className="spin" /> : ""}
                  </Button>
               </div>
               <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="../login" className="underline">
                     Login
                  </Link>
               </div>
            </CardContent>
         </Card>
      </form>
   );
}
