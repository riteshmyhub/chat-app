import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import useLogoutPage from "@/app/auth/logout/logout.page";
import { AvatarProfile, Header } from "@/shared/components";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { CameraIcon, LoaderCircle, LoaderCircleIcon, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePage({ createProfile }: { createProfile?: boolean }) {
   const { session } = useAppSelector((state) => state.authReducer);
   const logout = useLogoutPage();
   const dispatch = useAppDispatch();
   const [fields, setFields] = useState({
      avatar: "",
      first_name: "",
      last_name: "",
      about: "",
   });
   const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      const { name, value, type, files } = event.target;
      setFields({
         ...fields,
         [name]: type === "file" ? files?.[0] : value,
      });
   };

   const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         const formData = new FormData();
         typeof fields["avatar"] === "object" && formData.append("avatar", fields["avatar"]);
         formData.append("first_name", fields["first_name"]);
         formData.append("last_name", fields["last_name"]);
         formData.append("about", fields["about"]);
         await dispatch(authService.updateProfile.api(formData)).unwrap();
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (session?.data?.profile)
         setFields({
            ...fields,
            ...session?.data?.profile,
         });
      return () => {};
   }, [session?.data?.profile]);

   return (
      <>
         {!createProfile && <Header title="Profile" back="/settings" />}
         <form onSubmit={submit} className="grid grid-cols-12 gap-3 p-3">
            <div className="col-span-12">
               <div className="relative inline-block">
                  <AvatarProfile //
                     src={typeof fields?.avatar === "object" ? URL.createObjectURL(fields?.avatar) : fields?.avatar}
                     fallBackTxt={`${fields.first_name} ${fields.last_name}`}
                     height="120px"
                     width="120px"
                  />
                  <label htmlFor="avatar">
                     <CameraIcon size={30} className="bg-white p-1 rounded-full border absolute bottom-0 right-0" />
                     <input //
                        type="file"
                        name="avatar"
                        id="avatar"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleChange}
                        hidden
                     />
                  </label>
               </div>
               <span className="text-xs block text-gray-400">{session?.data?.email}</span>
            </div>
            <div className="col-span-6">
               <Input //
                  type="text"
                  name="first_name"
                  label="first name"
                  placeholder="first name"
                  onChange={handleChange}
                  value={fields.first_name}
                  required
               />
            </div>
            <div className="col-span-6">
               <Input //
                  type="text"
                  name="last_name"
                  label="last name"
                  placeholder="last name"
                  onChange={handleChange}
                  value={fields.last_name}
                  required
               />
            </div>
            <div className="col-span-12">
               <Textarea //
                  label="About"
                  name="about"
                  id="about"
                  className="border p-2 w-full"
                  placeholder="Enter about"
                  value={fields.about}
                  minLength={2}
                  maxLength={60}
                  onChange={handleChange}
                  required
               />
            </div>
            <div className="col-span-12">
               {createProfile ? (
                  <div className="flex justify-end gap-1">
                     <Button size="sm" type="submit" disabled={session?.isUpdating}>
                        Create Profile {session?.isUpdating ? <LoaderCircleIcon className="spin" /> : ""}
                     </Button>
                     <Button size="sm" type="button" variant="destructive" disabled={session?.isUpdating} onClick={logout.function}>
                        {logout.loading ? <LoaderCircle size={20} className="spin" /> : <LogOutIcon size={20} />}
                        Logout
                     </Button>
                  </div>
               ) : (
                  <Button type="submit" disabled={session?.isUpdating}>
                     Update Profile {session?.isUpdating ? <LoaderCircleIcon className="spin" /> : ""}
                  </Button>
               )}
            </div>
         </form>
      </>
   );
}
