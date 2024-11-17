import { Message } from "firebase-admin/lib/messaging/messaging-api";
import admin from "../firebase-admin-app";
import User from "../../models/user.model";

type Param = {
   userIds: any[]; // Now accepting an array of user IDs
   title: string;
   body: string;
   imageUrl?: string;
   data?: { [key: string]: string } | undefined;
};

export default async function FirebaseNotification({ userIds, title, body, imageUrl, data }: Param) {
   try {
      const users = await User.find({ _id: { $in: userIds } }).select("+fcm_tokens");
      const validUsers = users.map((user) => user?.fcm_tokens).flat();
      if (validUsers.length === 0) {
         return null; // No users with a valid FCM token
      }

      // Create the message payload for each user
      const messages: any = validUsers?.map((token) => ({
         token: token,
         notification: {
            title: body,
            body: title,
            ...(imageUrl ? { imageUrl: imageUrl } : {}),
         },
         ...(data ? { data } : {}),
      }));
      console.log(messages);

      const responses = await Promise.all(messages?.map((message: Message) => admin.messaging().send(message)));
      return responses;
   } catch (error) {
      console.log(error);
      return null;
   }
}
