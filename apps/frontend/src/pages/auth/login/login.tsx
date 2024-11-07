import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Link } from "react-router-dom";
import useLoginController from "./login.controller";
import { LoaderCircleIcon } from "lucide-react";

export default function LoginPage() {
   const ctrl = useLoginController();

   return (
      <form onSubmit={ctrl.submit} className="flex h-screen w-full items-end md:items-center justify-center">
         <Card className="mx-auto w-full md:w-[30%]">
            <CardHeader>
               <CardTitle className="text-2xl">Login</CardTitle>
               <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <Label htmlFor="email">Email</Label>
                     <Input //
                        id="email"
                        type="email"
                        name="email"
                        placeholder="m@example.com"
                        value={ctrl.fields.email}
                        onChange={ctrl.onChange}
                        required
                     />
                  </div>
                  <div className="grid gap-2">
                     <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link to="#" className="ml-auto inline-block text-sm underline">
                           Forgot your password?
                        </Link>
                     </div>
                     <Input //
                        id="password"
                        type="text"
                        name="password"
                        placeholder="password"
                        onChange={ctrl.onChange}
                        value={ctrl.fields.password}
                        required
                     />
                  </div>
                  <Button type="submit" className="w-full" disabled={ctrl.loading}>
                     Login
                     {ctrl.loading ? <LoaderCircleIcon className="spin" /> : ""}
                  </Button>
               </div>
               <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="../register" className="underline">
                     Sign up
                  </Link>
               </div>
            </CardContent>
         </Card>
      </form>
   );
}
