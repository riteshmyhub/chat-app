import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/store/store";

const SocketContext = createContext<{ socket: any | null }>({
   socket: null,
});

function SocketProvider({ children }: { children: Readonly<React.ReactNode> }) {
   const { authUser } = useAppSelector((state) => state.auth);
   const [socket, setSocket] = useState<Socket | null>(null);

   useEffect(() => {
      if (authUser) {
         const socket = io("http://localhost:8000", { withCredentials: true });

         setSocket(socket);
         socket.on("ONLINE_USERS", (data) => {
            console.log(data);
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
   }, [authUser]);

   return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}
function useSocket() {
   return useContext(SocketContext);
}

export { SocketProvider, useSocket };
