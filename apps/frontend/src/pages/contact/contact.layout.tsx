import { Outlet, useParams } from "react-router-dom";
import ContactsPage from "./contacts/contacts.page";
import { useMediaQuery } from "@/hooks";

export default function ContactLayout() {
   const screen = useMediaQuery();
   const { id } = useParams();

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
