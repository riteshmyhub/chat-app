import { AsideMenu, Navbar } from "@/components";
import MessagesPage from "@/pages/messages/page";
import { chatService } from "@/store/services/chat.service";
import { contactActions, contactService } from "@/store/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { LoaderCircleIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ContactDetailsPage() {
   const { loadings, contactDetails } = useAppSelector((state) => state.contact);
   const { onlineUsers, typing } = useAppSelector((state) => state.chat);
   const asideRef = useRef<any>(null);
   const { id } = useParams();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const deleteContact = (id: string) => {
      dispatch(contactService.deleteContact.api(id))
         .unwrap()
         .then(() => navigate("/contacts", { replace: true }))
         .catch((e) => e);
   };

   useEffect(() => {
      if (id) {
         dispatch(contactService.getContactDetails.api(id));
         dispatch(chatService.getMessages.api(id));
      }
      return () => {
         dispatch(contactActions.clearContectDetails());
      };
   }, [id]);

   if (loadings.getContactDetails) {
      return (
         <div className="space-y-4">
            {/* Header Skeleton */}
            <Skeleton className="h-16 w-full" />

            {/* Messages Skeleton */}
            <div className="space-y-4 h-[calc(100vh-10rem)] overflow-y-auto p-3">
               {/* Incoming Message Skeleton */}
               <div className="flex items-start space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="h-28 w-3/4 rounded-lg" />
               </div>

               {/* Outgoing Message Skeleton */}
               <div className="flex justify-end">
                  <Skeleton className="h-28 w-2/3 rounded-lg" />
               </div>

               {/* Additional Message Bubbles */}
               <div className="flex items-start space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="h-28 w-3/4 rounded-lg" />
               </div>

               <div className="flex justify-end">
                  <Skeleton className="h-28 w-2/3 rounded-lg" />
               </div>
            </div>

            {/* Input Skeleton */}
            <Skeleton className="h-16 w-full mt-4" />
         </div>
      );
   }
   if (!contactDetails) {
      return <p>no conact found</p>;
   }

   return (
      <AsideMenu
         ref={asideRef}
         aside={
            <div className="p-3">
               <span className="text-lg block font-semibold">Contact Details</span>
               <div>
                  <img src={contactDetails?.profile.avatar || "/images/group-chat-placeholder.png"} alt="avatar" className="h-36 w-36 mx-auto rounded-full" />
                  <h3 className="text-2xl text-center mb-2 font-medium">
                     {contactDetails?.profile.first_name} {contactDetails?.profile.last_name}
                  </h3>
                  <h3 className="text-md text-center font-normal">{contactDetails?.email}</h3>
               </div>
               {contactDetails?.profile?.about && (
                  <div className="py-2">
                     <span className="text-md text-gray-500">about</span>
                     <h3 className="text-sm font-normal">{contactDetails?.profile?.about}</h3>
                  </div>
               )}

               <div className="text-center my-3">
                  <Button //
                     type="button"
                     variant="destructive"
                     size="sm"
                     onClick={() => deleteContact(contactDetails?._id as string)}
                     disabled={loadings.deleteContact}>
                     {loadings.deleteContact && <LoaderCircleIcon className="spin" />} Delete Contact
                  </Button>
               </div>
            </div>
         }
         position="right">
         <Navbar //
            title={
               <b className="text-xl" onClick={() => asideRef.current?.setToggle(true)}>
                  {contactDetails?.profile.first_name} {contactDetails?.profile.last_name}
               </b>
            }
            back="../"
            avatar={contactDetails.profile.avatar}
            description={
               <p className="text-xs">
                  {typing ? (
                     "typing..."
                  ) : (
                     <React.Fragment>
                        {onlineUsers.includes(contactDetails?._id) ? ( //
                           <span className="font-semibold text-green-500">Online</span>
                        ) : (
                           <span className="font-semibold text-gray-500">Ofline</span>
                        )}
                     </React.Fragment>
                  )}
               </p>
            }
         />
         <MessagesPage id={contactDetails?._id} />
      </AsideMenu>
   );
}
