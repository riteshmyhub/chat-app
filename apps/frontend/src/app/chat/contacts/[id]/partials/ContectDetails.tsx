import { contactService } from "@/api/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { IChatDetails } from "@/api/types/chat.type";
import { AvatarProfile } from "@/shared/components";
import { Button } from "@/shared/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function ContectDetails({ chatDetails }: { chatDetails?: IChatDetails }) {
   const { contact } = useAppSelector((state) => state.contactReducer);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const deleteContact = async (id?: any) => {
      try {
         await dispatch(contactService.deleteContact.api(id)).unwrap();
         await dispatch(contactService.getContacts.api()).unwrap();
         navigate("/chat", { replace: true });
      } catch (error) {
         return;
      }
   };

   return (
      <div className="p-3">
         <span className="text-lg block font-semibold">Contact Details</span>
         <div className="mb-3">
            <div className="mb-3 flex justify-center">
               <AvatarProfile //
                  src={chatDetails?.avatar || ""}
                  fallBackTxt={chatDetails?.name || ""}
                  height="96px"
                  width="96px"
               />
            </div>
            <h3 className="text-xl text-center font-medium">{chatDetails?.name}</h3>
            <h3 className="text-sm text-center font-normal">{chatDetails?.about} </h3>
         </div>
         <div className="text-center my-3">
            <Button //
               type="button"
               variant="destructive"
               size="sm"
               onClick={() => deleteContact(chatDetails?._id)}
               disabled={contact.isDeleting}>
               {contact.isDeleting && <LoaderCircleIcon className="spin" />}
               Delete Contact
            </Button>
         </div>
      </div>
   );
}
