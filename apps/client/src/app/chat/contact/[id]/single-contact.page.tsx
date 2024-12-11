import { AsideMenu, Header } from "@/shared/components";
import MessagesPage from "../../messages/messages.page";
import ContactDetails from "./partials/ContactDetails";
import { useRef } from "react";

export default function SingleContactPage() {
   const asideRef = useRef<any>(null);
   const toggleAside = () => {
      asideRef.current?.setToggle((prev: boolean) => !prev);
   };
   return (
      <AsideMenu ref={asideRef} position="right" aside={<ContactDetails />}>
         <Header title={<b onClick={toggleAside}>Test User</b>} back="/chat/contacts" />
         <MessagesPage />
      </AsideMenu>
   );
}
