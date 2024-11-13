import { authService } from "@/store/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { CameraIcon, LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
   const { authUser, loadings } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
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
         navigate("/chats", { replace: true });
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (authUser?.profile)
         setFields({
            ...fields,
            ...authUser?.profile,
         });
      return () => {};
   }, [authUser]);

   return (
      <form onSubmit={submit} className="grid grid-cols-12 gap-3 p-3">
         <div className="col-span-12">
            <div className="relative inline-block">
               <img //
                  src={typeof fields?.avatar === "object" ? URL.createObjectURL(fields?.avatar) : fields?.avatar || "/images/user-placeholder.png"}
                  alt="avatar"
                  className="rounded-full border mx-auto w-[120px] h-[120px] object-cover"
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
            <span className="text-xs block text-gray-400">{authUser?.email}</span>
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
         <div>
            <Button type="submit" disabled={loadings.updateProfile}>
               Update Profile {loadings.updateProfile ? <LoaderCircleIcon className="spin" /> : ""}
            </Button>
         </div>
      </form>
   );
}
