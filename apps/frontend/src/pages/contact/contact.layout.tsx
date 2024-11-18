import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { contactService } from "@/store/services/contect.service";
import ContactsPage from "./contacts/contacts.page";
import { useMediaQuery } from "@/hooks";

export default function ContactLayout() {
   const screen = useMediaQuery();
   const dispatch = useAppDispatch();
   const { id } = useParams();

   useEffect(() => {
      dispatch(contactService.getContacts.api());
      return () => {};
   }, []);

   if (screen.md) {
      return (
         <div className="flex h-full">
            <aside className="md:block w-[350px] border-r border-gray-300">
               <ContactsPage />
            </aside>
            <main className="flex-1 h-full">
               <Outlet />
            </main>
         </div>
      );
   }
   return id ? <Outlet /> : <ContactsPage />;
}
