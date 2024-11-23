import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });
import express, { Request } from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";
import { AuthSocket } from "../middlewares/auth.middleware";
import FirebaseNotification from "../firebase/notification/notification";
import { firebaseDB } from "../firebase/firebase-admin-app";
import User from "../models/user.model";

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
      try {
         const message = {
            groupChat,
            sender: {
               _id: socket?.user?._id?.toString() || null, // Convert ObjectId to string
               name: `${socket?.user?.profile?.first_name ?? ""} ${socket?.user?.profile?.last_name ?? ""}`.trim(),
               avatar: socket?.user?.profile?.avatar || null,
            },
            chat,
            content,
            createdAt: new Date().toISOString(),
            attachments: attachments ?? [],
         };

         const ids = getSocketIds(members);

         io.to(ids).emit("RECEIVER_MESSAGE", message);

         await firebaseDB.collection("messages").add(message);
         if (!groupChat) {
            const contact = socket?.user?.contacts?.find((contact: any) => contact?.chatID === chat);
            if (!Boolean(await User.exists({ _id: contact?.person, "contacts.chatID": chat }))) {
               const user = await User.findById(contact?.person);
               user?.contacts.push({ chatID: contact?.chatID, person: userID });
               await user?.save();
               io.to(getSocketIds([contact?.person])).emit("refresh_contacts");
            }
            await FirebaseNotification({
               userIds: [contact?.person],
               title: `"${message?.sender?.name}" send new messages`,
               body: content || `${attachments?.length || 0} attachment(s) sent.`,
               url: "/contacts" + "/" + chat,
            });
         } else {
            await FirebaseNotification({
               userIds: members,
               title: `"${message?.sender?.name}" send new messages from channel`,
               body: content || `${attachments?.length || 0} attachment(s) sent.`,
               url: "/channels" + "/" + chat,
            });
         }
      } catch (error) {
         console.log(error);
      }
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
   eventName: "refresh_contacts" | "REFRESH_CHANNEL";
   to: any;
   data?: any;
};

const getSocketIds = (members: any[]) => {
   const ids = members?.map((id: any) => userSocketMap.get(id?.toString()));
   return ids;
};

const SocketEmitter = async ({ req, eventName, to, data }: ISocketEmitter) => {
   let io = req.app.get("io");
   io.to(getSocketIds(to)).emit(eventName, data);
};

export { app, server, SocketEmitter };
