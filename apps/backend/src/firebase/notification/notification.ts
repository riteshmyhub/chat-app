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
      // Retrieve all users by their IDs
      const users = await User.find({ _id: { $in: userIds } }).select("+fcm_token");

      // Filter out users who don't have a valid fcm_token
      const validUsers = users.filter((user) => user?.fcm_token);
      console.log(validUsers);

      if (validUsers.length === 0) {
         return null; // No users with a valid FCM token
      }

      // Create the message payload for each user
      const messages: Message[] = validUsers.map((user) => ({
         token: user?.fcm_token || "",
         notification: {
            title: body,
            body: title,
            ...(imageUrl ? { imageUrl: imageUrl } : {}),
         },
         data: data,
      }));

      // Send notifications to all valid users in parallel using Promise.all
      const responses = await Promise.all(messages.map((message) => admin.messaging().send(message)));
      return responses; // Return the response for each message
   } catch (error) {
      console.log(error);
      return null;
   }
}
