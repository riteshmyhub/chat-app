export interface INotification {
   notificationId: string;
   title?: string;
   date: string;
   body?: string;
   url?: string;
}
export interface IRingtone {
   _id: string;
   name: string;
   src: string;
   type: "notification" | "send" | "received";
}
