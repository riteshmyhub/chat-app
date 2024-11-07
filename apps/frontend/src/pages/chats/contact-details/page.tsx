import { chatService } from "@/store/services/chat.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IChatDetails } from "@/types/chat.type";
import { Button } from "@/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactDetailsPage({ chatDetails }: { chatDetails: IChatDetails }) {
   const { loadings } = useAppSelector((state) => state.chat);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const deleteContact = (id: string) => {
      dispatch(chatService.deleteContact.api(id)).unwrap()
         .then(() => navigate("/chats", { replace: true }))
         .catch((e) => e);
   };

   return (
      <div className="p-3">
         <span className="text-lg block font-semibold">Contact Details</span>
         <div>
            <img src={chatDetails.avatar || "/images/group-chat-placeholder.png"} alt="avatar" className="h-36 w-36 mx-auto rounded-full" />
            <h3 className="text-xl text-center mb-2 font-medium">{chatDetails.name}</h3>
            <h3 className="text-sm text-center font-normal">{chatDetails.about}</h3>
         </div>
         <div className="text-center my-3">
            <Button type="button" variant="destructive" size="sm" onClick={() => deleteContact(chatDetails._id)} disabled={loadings.deleteContact}>
               {loadings.deleteContact && <LoaderCircleIcon className="spin" />} Delete Contact
            </Button>
         </div>
      </div>
   );
}
