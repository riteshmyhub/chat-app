import { channelService } from "@/store/services/channel.service";
import { chatActions } from "@/store/services/chat.service";
import { contactService } from "@/store/services/contect.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IMessage } from "@/types/chat.type";
import { LocalDatabase } from "@/utils";
import toast from "react-hot-toast";

export default function useHandlerWS() {
   const { authUser } = useAppSelector((state) => state.auth);
   const { chatDetails } = useAppSelector((state) => state.chat);
   const dispatch = useAppDispatch();

   const onlineUser = (data: string[]) => {
      dispatch(chatActions.setOnlineUsers(data));
   };

   const receiveMessage = async (message: IMessage) => {
      LocalDatabase.messageCollection.add(message);
      if (chatDetails?._id === message?.chat || chatDetails?._id === message?.sender?._id) {
         dispatch(chatActions.setMessages(message));
         if (authUser?._id !== message?.sender?._id) {
            new Audio(authUser?.setting.received_message_sound?.src).play();
         }
         return;
      }
      new Audio(authUser?.setting.notification_sound?.src).play();
      dispatch(chatActions.setUnreadMessages(message));
      toast(`${message.sender.name} send new message`, {
         style: {
            borderRadius: "30px",
            background: "#333",
            color: "#fff",
         },
      });
   };

   const refreshContacts = () => {
      dispatch(contactService.getContacts.api());
   };

   const refreshChannels = () => {
      dispatch(channelService.getChannels.api());
   };

   const typing = (data: string) => {
      dispatch(chatActions.setTyping(data));
   };

   return { onlineUser, receiveMessage, refreshContacts, typing, refreshChannels };
}
