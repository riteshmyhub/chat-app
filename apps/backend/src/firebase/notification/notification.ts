import { Message } from "firebase-admin/lib/messaging/messaging-api";
import admin from "../firebase-admin-app";
import User from "../../models/user.model";
import { v4 as uuidv4 } from "uuid";
import FIREBASE from "../firebase-admin-app";

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
      const users = await User.find({ _id: { $in: userIds } }).select("+deviceToken +notifications");

      if (!users.length) return null;

      const dynaminUrl = url ? (url?.startsWith("http") ? url : `https://chat-app-onh1.onrender.com${url}`) : "https://chat-app-onh1.onrender.com";

      const tokensWithUid = users
         .filter((user) => user.deviceToken)
         .map((user) => {
            const notificationId = uuidv4();
            user.notifications.push({ notificationId, title, body, url: dynaminUrl });
            return { token: user.deviceToken, notificationId };
         });

      if (!tokensWithUid.length) return null;

      const messages: any[] = tokensWithUid.map((item) => ({
         token: item.token,
         notification: { title: title, body: body },
         data: {
            date: new Date().toISOString(),
            url: dynaminUrl,
            notificationId: item.notificationId,
            ...data,
         },
      }));

      const responses = await Promise.all(messages.map((message) => FIREBASE.ADMIN.messaging().send(message)));
      await Promise.all(users.map((user) => user.save()));
      return responses;
   } catch (error) {
      return null; // Return null on error
   }
}
