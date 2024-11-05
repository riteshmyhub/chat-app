import HttpInterceptor from "@/store/interceptors/http.interceptor";
import { useAppSelector } from "@/store/store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import useChatHandlerWS from "./handlers/chat-handlers.ws";

const SocketContext = createContext<{ socket: Socket | null }>({
   socket: null,
});

function SocketProvider({ children }: { children: Readonly<React.ReactNode> }) {
   const { token, authUser } = useAppSelector((state) => state.auth);
   const { chatDetails } = useAppSelector((state) => state.chat);
   const [socket, setSocket] = useState<Socket | null>(null);
   const chatHandler = useChatHandlerWS();

   useEffect(() => {
      if (authUser) {
         const socket = io(HttpInterceptor.SERVER_URL, { auth: { token: token } });
         setSocket(socket);
         socket.on("ONLINE_USERS", chatHandler.onlineUsers);
         socket.on("RECEIVER_MESSAGE", chatHandler.receiveMessage);
         socket.on("TYPING", chatHandler.typing);
         socket.on("REFRESH_CHATS", chatHandler.refreshChats);
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
   }, [authUser, chatDetails]);

   return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}
function useSocket() {
   return useContext(SocketContext);
}

export { SocketProvider, useSocket };
