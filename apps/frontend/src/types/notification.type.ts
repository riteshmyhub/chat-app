export interface INotification {
   title: string;
   description: string;
   action: string;
}
export interface IRingtone {
   _id: string;
   name: string;
   src: string;
   type: "notification" | "send" | "received";
}
