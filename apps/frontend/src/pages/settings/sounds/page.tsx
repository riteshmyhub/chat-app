import { authService } from "@/store/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IRingtone } from "@/types/notification.type";
import { Button } from "@/ui/button";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

type SelectedRingtone = {
   received_message_sound: IRingtone | null;
   send_message_sound: IRingtone | null;
   notification_sound: IRingtone | null;
};

export default function SoundsPage() {
   const dispatch = useAppDispatch();
   const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
   const { loadings, authUser, appSettings } = useAppSelector((state) => state.auth);
   const [selectedRingtone, setRingtone] = useState<SelectedRingtone>({
      received_message_sound: null,
      send_message_sound: null,
      notification_sound: null,
   });
   const soundTypes = new Set();

   const playRingtone = (src: string) => {
      if (currentAudio) {
         currentAudio.pause();
         currentAudio.currentTime = 0;
      }
      const newAudio = new Audio(src);
      newAudio.play();
      setCurrentAudio(newAudio);
   };

   const saveSound = async () => {
      try {
         const formData = new FormData();
         if (selectedRingtone.notification_sound) {
            formData.append("notification_sound", selectedRingtone.notification_sound._id);
         }
         if (selectedRingtone.received_message_sound) {
            formData.append("received_message_sound", selectedRingtone.received_message_sound._id);
         }
         if (selectedRingtone.send_message_sound) {
            formData.append("send_message_sound", selectedRingtone.send_message_sound._id);
         }
         await dispatch(authService.updateRingtone.api(formData)).unwrap();
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (authUser?.setting) {
         console.log(authUser?.setting);

         setRingtone({
            received_message_sound: authUser?.setting?.received_message_sound || null,
            send_message_sound: authUser?.setting?.send_message_sound || null,
            notification_sound: authUser?.setting?.notification_sound || null,
         });
      }
      return () => {};
   }, [authUser?.setting]);

   return (
      <div className="p-2">
         <div className="flex justify-between items-center mb-3">
            <div className="text-2xl">Sound setting</div>
            <div>
               <Button size="sm" disabled={loadings.updateRingtone} onClick={saveSound}>
                  Change Ringtone {loadings.updateRingtone && <LoaderCircleIcon className="spin" />}
               </Button>
            </div>
         </div>
         {appSettings?.ringtones?.map((ringtone) => {
            const title = !soundTypes.has(ringtone.type);
            soundTypes.add(ringtone.type);
            return (
               <div key={ringtone._id}>
                  {title && <span className="block capitalize font-medium">{ringtone.type}</span>}
                  <label htmlFor={ringtone._id} className="flex gap-3 text-sm cursor-pointer py-1">
                     <input //
                        type="radio"
                        name={ringtone.type}
                        id={ringtone._id}
                        checked={
                           ringtone._id === selectedRingtone.received_message_sound?._id || //
                           ringtone._id === selectedRingtone.send_message_sound?._id ||
                           ringtone._id === selectedRingtone.notification_sound?._id
                        }
                        onChange={(e) => {
                           playRingtone(ringtone.src);
                           switch (e.target.name) {
                              case "notification":
                                 setRingtone({ ...selectedRingtone, notification_sound: ringtone });
                                 break;
                              case "send":
                                 setRingtone({ ...selectedRingtone, send_message_sound: ringtone });
                                 break;
                              case "received":
                                 setRingtone({ ...selectedRingtone, received_message_sound: ringtone });
                                 break;
                              default:
                                 return;
                           }
                        }}
                     />
                     {ringtone.name}
                     {ringtone._id === authUser?.setting.notification_sound?._id && ( //
                        <CheckIcon size={20} />
                     )}
                     {ringtone._id === authUser?.setting.received_message_sound?._id && ( //
                        <CheckIcon size={20} />
                     )}
                     {ringtone._id === authUser?.setting.send_message_sound?._id && ( //
                        <CheckIcon size={20} />
                     )}
                  </label>
               </div>
            );
         })}
      </div>
   );
}
