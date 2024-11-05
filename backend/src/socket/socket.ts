import express, { Request } from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";
import Message from "../models/message.model";
import corsConfig from "../libs/cors";
import SocketAuthMiddleware from "../middlewares/auth-socket.middleware";
import { APP_STORAGE } from "../utils/constants/constants";

const app = express();

const server = http.createServer(app);
const io = new SocketServer(server, {
   cors: corsConfig,
   maxHttpBufferSize: 200 * 1024 * 1024, // 200 mb
});
io.use(SocketAuthMiddleware);
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
   socket.on("SEND_MESSAGE", async ({ chat, members, content, groupChat, attachments }) => {
      const message = {
         groupChat,
         sender: {
            _id: socket?.user?._id,
            name: `${socket?.user.profile?.first_name} ${socket?.user.profile?.last_name}`,
            avatar: socket?.user.profile?.avatar,
         },
         chat: chat,
         content,
         createdAt: new Date().toISOString(),
         attachments: attachments,
      };

      const chatMembers = members.map((member: any) => member?._id.toString());
      io.to(getSocketIds(chatMembers)).emit("RECEIVER_MESSAGE", message);

      if (APP_STORAGE) return;

      try {
         await Message.create({ sender: socket?.user?._id, chat, content });
      } catch (error) {
         console.log(error);
      }
   });

   //TYPING
   socket.on("TYPING", (data: { members: any[]; chat: string; isTyping: boolean }) => {
      const person = `${socket.user.profile?.first_name} ${socket.user.profile?.last_name}`;
      if (typeof data?.isTyping !== "boolean") return;
      const chatMembers = getSocketIds(data?.members.map((member) => member?._id.toString()));
      socket.to(chatMembers).emit("TYPING", {
         chatID: data.chat,
         text: data?.isTyping ? `${person} is typing...` : "",
      });
   });

   // disconnect
   socket.on("disconnect", () => {
      console.log("disconnect : ", socket.id);
      for (const [userID, socketID] of userSocketMap.entries()) {
         if (socketID === socket.id) {
            userSocketMap.delete(userID);
            io.emit("ONLINE_USERS", Array.from(userSocketMap.keys()));
            console.log(userID);
            break;
         }
      }
   });
});

type ISocketEmitter = {
   req: Request;
   eventName: "ALERT" | "REFRESH_CHATS";
   to: any;
   data?: any;
};
const SocketEmitter = ({ req, eventName, to, data }: ISocketEmitter) => {
   let io = req.app.get("io");
   const chatMembers = to?.map((id: any) => userSocketMap.get(id.toString()));
   io.to(chatMembers).emit(eventName, data);
};

const getSocketIds = (members: any[]) => {
   const ids = members?.map((id: any) => userSocketMap.get(id?.toString()));
   return ids;
};

export { app, server, SocketEmitter };
