import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { chatActions } from "@/store/services/chat.service";
import { contactService } from "@/store/services/contect.service";
import { IMessage } from "@/types/chat.type";

const SocketContext = createContext<{ socket: any | null }>({
   socket: null,
});

function SocketProvider({ children }: { children: Readonly<React.ReactNode> }) {
   const { authUser } = useAppSelector((state) => state.auth);
   const { contactDetails } = useAppSelector((state) => state.contact);
   const [socket, setSocket] = useState<Socket | null>(null);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (authUser) {
         const socket = io("https://chat-app-onh1.onrender.com", { withCredentials: true });

         setSocket(socket);
         socket.on("ONLINE_USERS", (data) => {
            console.log(data);
         });

         socket.on("RECEIVER_MESSAGE", (message: IMessage) => {
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
         });

         socket.on("refresh_contacts", () => {
            dispatch(contactService.getContacts.api());
         });

         socket.on("ALERT", (data) => {
            console.log(data);
         });

         return () => socket.close();
      } else {
         if (socket) {
            socket.close();
            setSocket(null);
         }
      }
      return () => {};
   }, [authUser, contactDetails]);

   return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}
function useSocket() {
   return useContext(SocketContext);
}

export { SocketProvider, useSocket };
