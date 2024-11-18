import { Image, MediaList } from "@/components";
import { contactService } from "@/store/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IChatDetails } from "@/types/chat.type";
import { Button } from "@/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactDetailsPage({ chatDetails }: { chatDetails: IChatDetails }) {
   const { loadings } = useAppSelector((state) => state.contact);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const deleteContact = (id: string) => {
      dispatch(contactService.deleteContact.api(id))
         .unwrap()
         .then(() => navigate("/channels", { replace: true }))
         .catch((e) => e);
   };

   return (
      <div className="p-3">
         <span className="text-lg block font-semibold">Contact Details</span>
         <div>
            <Image //
               src={chatDetails.avatar}
               alt="avatar"
               className="h-36 w-36 mx-auto rounded-full border"
               asAvatar
            />
            <h3 className="text-xl text-center mb-2 font-medium">{chatDetails.name}</h3>
            <h3 className="text-sm text-center font-normal">{chatDetails.about}</h3>
         </div>
         {/* ------------------MediaList--------------------- */}
         <MediaList />
         <div className="text-center my-3">
            <Button type="button" variant="destructive" size="sm" onClick={() => deleteContact(chatDetails._id)} disabled={loadings.deleteContact}>
               {loadings.deleteContact && <LoaderCircleIcon className="spin" />}
               Delete Contact
            </Button>
         </div>
      </div>
   );
}
