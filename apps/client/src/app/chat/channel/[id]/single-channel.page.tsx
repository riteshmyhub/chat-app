import MessagesPage from "../../messages/messages.page";
import ChannelDetails from "./partials/ChannelDetails";

export default function SingleChannelPage() {
   return (
      <div>
         <ChannelDetails />
         <MessagesPage />
      </div>
   );
}
