import { chatActions } from "@/store/services/chat.service";
import { contactService } from "@/store/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IMessage } from "@/types/chat.type";
import { LocalDatabase } from "@/utils";

export default function useHandlerWS() {
   const { authUser } = useAppSelector((state) => state.auth);
   const { contactDetails } = useAppSelector((state) => state.contact);
   const dispatch = useAppDispatch();

   const onlineUser = (data: string[]) => {
      dispatch(chatActions.setOnlineUsers(data));
   };

   const receiveMessage = async (message: IMessage) => {
      LocalDatabase.messageCollection.add(message);
      if (contactDetails?._id === message.chat || contactDetails?._id === message?.sender?._id) {
         dispatch(chatActions.setMessages(message));
         if (authUser?._id !== message?.sender?._id) {
            new Audio(authUser?.setting.received_message_sound?.src).play();
         }
         return;
      }
      new Audio(authUser?.setting.notification_sound?.src).play();
      dispatch(chatActions.setUnreadMessages(message));
      alert(`${message.sender.name} send new message`);
   };

   const refreshContacts = () => {
      dispatch(contactService.getContacts.api());
   };

   const alert = (data: any) => {
      console.log(data);
   };

   const typing = (data: string) => {
      dispatch(chatActions.setTyping(data));
   };

   return { onlineUser, receiveMessage, refreshContacts, alert, typing };
}
