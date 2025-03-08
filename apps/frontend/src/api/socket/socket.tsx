import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import useHandlerWS from "./handlers/handlers.ws";
import { useAppSelector } from "../store";
import HttpInterceptor from "../interceptors/http.interceptor";

const SocketContext = createContext<{ socket: any | null }>({
   socket: null,
});

function SocketProvider({ children }: { children: Readonly<React.ReactNode> }) {
   const { session, accessToken } = useAppSelector((state) => state.authReducer);
   const { chatDetails } = useAppSelector((state) => state.chatReducer);
   const [socket, setSocket] = useState<Socket | null>(null);
   const ws = useHandlerWS();

   useEffect(() => {
      if (session.data) {
         const socket = io(new HttpInterceptor().URL.replace("/api/v1", ""), { withCredentials: true, auth: { accessToken } });
         setSocket(socket);
         socket.on("ONLINE_USERS", ws.onlineUser);
         socket.on("RECEIVER_MESSAGE", ws.receiveMessage);
         socket.on("refresh_contacts", ws.refreshContacts);
         socket.on("REFRESH_CHANNEL", ws.refreshChannels);
         socket.on("TYPING", ws.typing);
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
   }, [session.data, chatDetails]);

   return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}
function useSocket() {
   return useContext(SocketContext);
}

export { SocketProvider, useSocket };
