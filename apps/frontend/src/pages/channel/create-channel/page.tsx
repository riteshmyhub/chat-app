import { DebounceSearch, Loading } from "@/components";
import { channelService } from "@/store/services/channel.service";
import { contactService } from "@/store/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IMember } from "@/types/channel.type";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { CameraIcon, LoaderCircleIcon, XIcon } from "lucide-react";
import React, { useState } from "react";

type Props = { members: IMember[]; removeMembers: (id: string) => void };

const SeletedMembers = ({ members, removeMembers }: Props) => {
   return (
      <div className="flex flex-wrap gap-2 mb-2">
         {members?.map((member) => (
            <Badge variant="outline" className="flex gap-2">
               <img //
                  src={member?.profile?.avatar || "/images/user-placeholder.png"}
                  alt="avatar"
                  className="rounded-full h-7 w-7 border"
               />{" "}
               <span className="text-[9px] md:text-xs block">{member.email}</span>
               <XIcon size={14} role="button" className="bg-red-600 text-white h-4 w-4 rounded-full" onClick={() => removeMembers(member._id)} />
            </Badge>
         ))}
      </div>
   );
};

export default function CreateChannelPage({ onClose }: { onClose: Function }) {
   const dispatch = useAppDispatch();
   const { loadings } = useAppSelector((state) => state.channel);
   const [fields, setFields] = useState({
      avatar: "",
      name: "",
      about: "",
      members: [] as IMember[],
   });

   const removeMembers = (id: string) => {
      let list = fields?.members?.filter((u) => u._id !== id);
      setFields({
         ...fields,
         members: list,
      });
      return list;
   };

   const change = (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>, user?: IMember) => {
      const { checked, name, value, type, files } = event.target;
      switch (type) {
         case "checkbox":
            if (!user) return;
            setFields({
               ...fields,
               members: checked ? [user, ...fields?.members] : removeMembers(user?._id),
            });
            break;
         case "file":
            setFields({ ...fields, [name]: files?.[0] });
            break;
         default:
            setFields({ ...fields, [name]: value });
            break;
      }
   };

   const close = () => {
      setFields({ avatar: "", name: "", about: "", members: [] });
      onClose();
   };

   const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         const formData = new FormData();
         console.log(typeof fields.avatar);

         formData.append("isGroupChat", "true");
         formData.append("name", fields.name);
         formData.append("about", fields.about);
         if (typeof fields.avatar === "object") {
            formData.append("avatar", fields.avatar);
         }
         fields?.members?.forEach((member) => {
            formData.append("members[]", member._id);
         });
         console.log(Object.fromEntries(formData));
         await dispatch(channelService.createChannel.api(formData)).unwrap();
         close();
      } catch (error) {
         return;
      }
   };

   const searchHandler = async (str: string) => {
      const { data } = await dispatch(contactService.searchUsers.api(str)).unwrap();
      console.log(data);
      return data?.contacts as any;
   };

   return (
      <form onSubmit={submit} className="grid grid-cols-1 gap-3">
         <div className="">
            <div className="relative inline-block">
               <img //
                  src={(typeof fields?.avatar === "object" ? URL.createObjectURL(fields?.avatar) : fields?.avatar) || "/images/group-chat-placeholder.png"}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="rounded-full border"
               />
               <label role="button" className="absolute bottom-1 right-1">
                  <CameraIcon size={30} className="bg-white p-1 rounded-full border" />
                  <input type="file" onChange={change} hidden name="avatar" />
               </label>
            </div>
         </div>
         <div>
            <Input className="h-10" name="name" label="Channe Name" placeholder="Enter your Channel Name" value={fields.name} onChange={change} required />
         </div>
         <div>
            <Textarea label="About" name="about" rows={3} placeholder="Enter your Channel About in 100 letters" value={fields.about} onChange={change} maxLength={100} />
         </div>
         <div>
            <Label className="mb-2 block text-sm font-medium">Member {fields?.members?.length}</Label>
            <SeletedMembers members={fields.members} removeMembers={removeMembers} />

            <DebounceSearch handler={searchHandler}>
               {({ loading, items }) => (
                  <React.Fragment>
                     <Loading loading={loading} className="h-48 flex justify-center items-center mt-2">
                        <div className="h-56  border mt-2">
                           {items?.map((member: IMember) => (
                              <label key={member._id} htmlFor={member._id} role="button" className="flex items-center p-2 bg-white hover:bg-[#F0F2F5] px-3">
                                 <div className="basis-1/6">
                                    <span className="relative">
                                       <img src={member.profile.avatar || "/images/user-placeholder.png"} alt="avatar" className="mx-auto block rounded-full h-11 w-11" />
                                    </span>
                                 </div>
                                 <div className="basis-1/2">
                                    <span className="block text-xs font-medium">
                                       {member.profile?.first_name} {member.profile?.last_name}
                                    </span>
                                    <span className="text-xs block">{member?.email}</span>
                                 </div>
                                 <div className="basis-1/4 text-end">
                                    <span>
                                       <input
                                          type="checkbox"
                                          name="members"
                                          id={member._id}
                                          onChange={(e: any) => change(e, member)}
                                          checked={Boolean(fields?.members?.find((f) => f?._id === member?._id))}
                                       />
                                    </span>
                                 </div>
                              </label>
                           ))}
                        </div>
                     </Loading>
                  </React.Fragment>
               )}
            </DebounceSearch>
         </div>
         <div>
            <Button type="submit" size="sm" className="text-xs flex gap-2 uppercase" disabled={loadings.createChannel}>
               Create Channel {loadings.createChannel && <LoaderCircleIcon size={16} className="spin" />}
            </Button>
         </div>
      </form>
   );
}
