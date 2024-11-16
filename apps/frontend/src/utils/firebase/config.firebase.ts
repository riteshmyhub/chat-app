import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAJcgmFNsE1fdllEwAD_4Da-4KrvnM9L60",
   authDomain: "chat-app-85dd2.firebaseapp.com",
   projectId: "chat-app-85dd2",
   storageBucket: "chat-app-85dd2.firebasestorage.app",
   messagingSenderId: "393110017667",
   appId: "1:393110017667:web:2238e9aaf3ca9431976db6",
};

const vapidKey = "BPSK7k9CTrLfDOLaPF4XY4KfegsaX0S_AT4btgpesXWbhLLK7yVZ4I8Ht4waE8kCWjSKZai-SL-i7zOLQ-aIduc";
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const requestFcmToken = async () => {
   return Notification.requestPermission()
      .then((permission) => {
         if (permission === "granted") {
            return getToken(messaging, { vapidKey: vapidKey });
         } else {
            throw new Error("Permission not granted");
         }
      })
      .catch((e) => {
         console.log("fcm token error", e);
         throw e;
      });
};

export const onNotification = async () => {
   return new Promise((resolve) => {
      onMessage(messaging, (args) => {
         resolve(args);
      }); 
   });
};
