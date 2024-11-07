import { chatActions, chatService } from "@/store/services/chat.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IMessage, ITyping } from "@/types/chat.type";
import { LocalDatabase } from "@/utils";
import toast from "react-hot-toast";

export default function useChatHandlerWS() {
   const dispatch = useAppDispatch();
   const { chatDetails } = useAppSelector((state) => state.chat);
   const { authUser } = useAppSelector((state) => state.auth);

   const onlineUsers = (data: string[]) => {
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
      toast.success(`${message.sender.name} send new message`);
   };

   const typing = (data: ITyping) => {
      dispatch(chatActions.setTyping(data));
   };

   const refreshChats = () => {
      dispatch(chatService.getChannels.api());
      dispatch(chatService.getContacts.api());
   };
   return { onlineUsers, receiveMessage, typing, refreshChats };
}
