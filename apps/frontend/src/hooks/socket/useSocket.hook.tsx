import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/store/store";
import useHandlerWS from "./handlers/handlers.ws";

const SocketContext = createContext<{ socket: any | null }>({
   socket: null,
});

function SocketProvider({ children }: { children: Readonly<React.ReactNode> }) {
   const { authUser } = useAppSelector((state) => state.auth);
   const { chatDetails } = useAppSelector((state) => state.chat);
   const [socket, setSocket] = useState<Socket | null>(null);
   const ws = useHandlerWS();

   useEffect(() => {
      if (authUser) {
         const socket = io("https://chat-app-onh1.onrender.com", { withCredentials: true });
         setSocket(socket);
         socket.on("ONLINE_USERS", ws.onlineUser);
         socket.on("TYPING", ws.typing);
         socket.on("RECEIVER_MESSAGE", ws.receiveMessage);
         socket.on("refresh_contacts", ws.refreshContacts);
         socket.on("REFRESH_CHANNEL", ws.refreshChannels);
         socket.on("ALERT", ws.alert);

         return () => {
            socket.close();
         };
      } else {
         if (socket) {
            socket.close();
            setSocket(null);
         }
      }
      return () => {};
   }, [authUser, chatDetails]);

   return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}
function useSocket() {
   return useContext(SocketContext);
}

export { SocketProvider, useSocket };
