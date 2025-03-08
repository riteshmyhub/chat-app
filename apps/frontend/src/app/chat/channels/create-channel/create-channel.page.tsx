import { channelService } from "@/api/services/channel.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { CameraIcon, LoaderCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
   onClose: Function;
   upadateData?: { name?: string; about?: string; avatar?: any; channelID?: string } | null;
};
export default function CreateChannelPage({ onClose, upadateData }: Props) {
   const dispatch = useAppDispatch();
   const { channel } = useAppSelector((state) => state.channelReducer);
   const [fields, setFields] = useState({
      avatar: "",
      name: "",
      about: "",
   });

   const change = (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      const { name, value, type, files } = event.target;
      switch (type) {
         case "file":
            setFields({ ...fields, [name]: files?.[0] });
            break;
         default:
            setFields({ ...fields, [name]: value });
            break;
      }
   };

   const close = () => {
      setFields({ avatar: "", name: "", about: "" });
      onClose();
   };

   const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         const formData = new FormData();
         formData.append("isGroupChat", "true");
         formData.append("name", fields.name);
         formData.append("about", fields.about);
         if (typeof fields.avatar === "object") {
            formData.append("avatar", fields.avatar);
         }
         if (upadateData) {
            formData.append("channelID", upadateData?.channelID as string);
            await dispatch(channelService.updateChannels.api(formData)).unwrap();
         } else {
            await dispatch(channelService.createChannel.api(formData)).unwrap();
         }

         await dispatch(channelService.getChannels.api()).unwrap();
         close();
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (upadateData) {
         setFields({
            name: upadateData?.name || "",
            about: upadateData?.about || "",
            avatar: upadateData?.avatar,
         });
      }
      return () => {};
   }, [upadateData]);

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
         <div className="flex justify-end gap-1">
            {upadateData ? (
               <Button type="submit" size="sm" className="text-xs flex gap-2 uppercase" disabled={channel.isUpdating}>
                  Update Channel {channel.isUpdating && <LoaderCircleIcon size={16} className="spin" />}
               </Button>
            ) : (
               <Button type="submit" size="sm" className="text-xs flex gap-2 uppercase" disabled={channel.isCreating}>
                  Create Channel {channel.isCreating && <LoaderCircleIcon size={16} className="spin" />}
               </Button>
            )}

            <Button type="button" variant="destructive" size="sm" className="text-xs flex gap-2 uppercase" onClick={() => onClose()}>
               cancel
            </Button>
         </div>
      </form>
   );
}
