import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });
import express, { Request } from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";
import { AuthSocket } from "../middlewares/auth.middleware";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
   cors: {
      origin: ["https://chat-app-onh1.onrender.com", "http://192.168.1.153:3000", "http://192.168.1.43:3000", "http://localhost:3000"],
      credentials: true,
   },
   maxHttpBufferSize: 200 * 1024 * 1024, // 200 mb
});
io.use(AuthSocket);
app.set("io", io);

const userSocketMap = new Map();

io.on("connection", (socket) => {
   const userID = socket.user?._id.toString();
   if (userID) {
      userSocketMap.set(userID, socket.id);
      console.log(`${userID} connected with ${socket.id}`);
   } else {
      console.log("no user id");
   }
   //ONLINE_USERS
   io.emit("ONLINE_USERS", Array.from(userSocketMap.keys()));

   //SEND_MESSAGE
   socket.on("SEND_MESSAGE", async ({ chat, content, members, groupChat, attachments }) => {
      const message = {
         groupChat,
         sender: {
            _id: socket?.user?._id,
            name: `${socket?.user?.profile?.first_name} ${socket?.user?.profile?.last_name}`,
            avatar: socket?.user?.profile?.avatar,
         },
         chat,
         content,
         createdAt: new Date().toISOString(),
         attachments,
      };
      const ids = getSocketIds(members?.map((member: any) => member?._id));
      io.to(ids).emit("RECEIVER_MESSAGE", message);
   });

   //TYPING
   socket.on("TYPING", (data: { members: any[]; chat: string; isTyping: boolean }) => {
      const person = `${socket.user.profile?.first_name} ${socket.user.profile?.last_name}`;
      if (typeof data?.isTyping !== "boolean") return;
      const ids = getSocketIds(data.members);
      socket.to(ids).emit("TYPING", data?.isTyping ? `${person} is typing...` : "");
   });

   // disconnect
   socket.on("disconnect", async () => {
      for (const [userID, socketID] of userSocketMap.entries()) {
         if (socketID === socket.id) {
            userSocketMap.delete(userID);
            io.emit("ONLINE_USERS", Array.from(userSocketMap.keys()));
            console.log(`disconnect ${userID} with socket -> ${socket.id}`);
            break;
         }
      }
   });
});

type ISocketEmitter = {
   req: Request;
   eventName: "ALERT" | "refresh_contacts" | "REFRESH_CHANNEL";
   to: any;
   data?: any;
};

const getSocketIds = (members: any[]) => {
   const ids = members?.map((id: any) => userSocketMap.get(id?.toString()));
   return ids;
};

const SocketEmitter = ({ req, eventName, to, data }: ISocketEmitter) => {
   let io = req.app.get("io");
   io.to(getSocketIds(to)).emit(eventName, data);
};

export { app, server, SocketEmitter };
