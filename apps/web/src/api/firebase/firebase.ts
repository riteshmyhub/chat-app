import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAJcgmFNsE1fdllEwAD_4Da-4KrvnM9L60",
   authDomain: "chat-app-85dd2.firebaseapp.com",
   projectId: "chat-app-85dd2",
   storageBucket: "chat-app-85dd2.firebasestorage.app",
   messagingSenderId: "393110017667",
   appId: "1:393110017667:web:2238e9aaf3ca9431976db6",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const firebase = {
   vapidKey: "BPSK7k9CTrLfDOLaPF4XY4KfegsaX0S_AT4btgpesXWbhLLK7yVZ4I8Ht4waE8kCWjSKZai-SL-i7zOLQ-aIduc",
   messaging: getMessaging(app),
   async getDeviceToken() {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
         throw new Error("Permission not granted");
      }
      try {
         const cachedToken = localStorage.getItem("deviceToken");
         if (cachedToken) return cachedToken;
         const deviceToken = await getToken(this.messaging, { vapidKey: this.vapidKey });
         localStorage.setItem("deviceToken", deviceToken);
         return deviceToken;
      } catch (error) {
         throw error;
      }
   },
};
