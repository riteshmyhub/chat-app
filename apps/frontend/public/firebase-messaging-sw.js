/* eslint-disable no-restricted-globals */
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// Initialize Firebase in the Service Worker
const firebaseConfig = {
   apiKey: "AIzaSyAJcgmFNsE1fdllEwAD_4Da-4KrvnM9L60",
   authDomain: "chat-app-85dd2.firebaseapp.com",
   projectId: "chat-app-85dd2",
   storageBucket: "chat-app-85dd2.firebasestorage.app",
   messagingSenderId: "393110017667",
   appId: "1:393110017667:web:2238e9aaf3ca9431976db6",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
   self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/favicon.svg", // Path to your app's icon
      data: {
         date: payload.data?.date,
         url: payload.data?.url,
         notificationId: payload.data?.notificationId,
      },
   });
});
// Handle notification click
self.addEventListener("notificationclick", (event) => {
   const notification = event.notification;
   const url = notification.data?.url;
   // Close the notification
   notification.close();
   // Open the URL in a new tab
   if (url) {
      event.waitUntil(
         clients.openWindow(url) // Open the URL when the notification is clicked
      );
   }
});
