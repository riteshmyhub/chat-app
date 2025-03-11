import { messaging } from "@/api/firebase/firebase";
import { channelService } from "@/api/services/channel.service";
import { chatActions } from "@/api/services/chat.service";
import { contactService } from "@/api/services/contect.service";
import { messageActions } from "@/api/services/message.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { IMessage } from "@/api/types/chat.type";
import sounds from "@/assets/audios/sounds";
import { onMessage } from "firebase/messaging";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useHandlerWS() {
   const { session } = useAppSelector((state) => state.authReducer);
   const { chatDetails } = useAppSelector((state) => state.chatReducer);
   const dispatch = useAppDispatch();

   const onlineUser = (data: string[]) => {
      dispatch(chatActions.setOnlineUsers(data));
   };

   const receiveMessage = async (message: IMessage) => {
      if (chatDetails?.data?._id === message?.chat || chatDetails?.data?._id === message?.from) {
         dispatch(messageActions.setMessages(message));
         if (session?.data?._id !== message?.from) {
            new Audio(sounds.received).play();
         }
         return;
      }
      new Audio(sounds.alert).play();
      dispatch(messageActions.setUnreadMessages(message));
      toast(`send new message`, {
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
   const typing = (data: { name: string; avatar: string }) => {
      dispatch(chatActions.setTyping(data));
   };

   useEffect(() => {
      onMessage(messaging, (_) => {
         // dispatch(
         //    notificationAction.setINotification({
         //       notificationId: args?.data?.notificationId as string,
         //       title: args?.notification?.title,
         //       body: args?.notification?.body,
         //       date: args?.data?.date as string,
         //       url: args?.data?.url as string,
         //    })
         // );
      });
      return () => {};
   }, []);

   return { onlineUser, receiveMessage, refreshContacts, typing, refreshChannels };
}
