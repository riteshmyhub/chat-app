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
         <Header //
            avatar="https://mui.com/static/images/avatar/2.jpg"
            title={<b onClick={toggleAside}>Test User</b>}
            description={<p className="text-xs font-bold">online</p>}
            back="/chat/contacts"
         />
         <MessagesPage />
      </AsideMenu>
   );
}
