import { Message } from "firebase-admin/lib/messaging/messaging-api";
import admin from "../firebase-admin-app";
import User from "../../models/user.model";
import { v4 as uuidv4 } from "uuid";

type Param = {
   userIds: any[]; // Now accepting an array of user IDs
   title: string;
   body: string;
   imageUrl?: string;
   data?: { [key: string]: string };
   url?: string;
};

export default async function FirebaseNotification({ userIds, title, body, url, imageUrl, data }: Param) {
   try {
      const users = await User.find({ _id: { $in: userIds } }).select("+fcm_token +notifications");

      if (!users.length) {
         return null; // No users found
      }
      const dynaminUrl = url ? (url?.startsWith("http") ? url : `https://chat-app-onh1.onrender.com${url}`) : "https://chat-app-onh1.onrender.com";
      const tokens: string[] = [];
      users.forEach((user) => {
         if (user.fcm_token) {
            tokens.push(user.fcm_token);
            user.notifications.push({ title, body, url: dynaminUrl });
         }
      });

      if (!tokens.length) {
         return null;
      }
      const messages: Message[] = tokens.map((token) => ({
         token,
         notification: {
            title: title,
            body: body,
            ...(imageUrl ? { imageUrl } : {}),
         },
         data: {
            date: new Date().toISOString(),
            url: dynaminUrl,
            uid: uuidv4(),
            ...data,
         },
      }));

      const responses = await Promise.all(messages.map((message) => admin.messaging().send(message)));
      await Promise.all(users.map((user) => user.save()));

      return responses;
   } catch (error) {
      return null; // Return null on error
   }
}
