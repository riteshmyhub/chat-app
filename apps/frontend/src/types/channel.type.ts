import { IUser } from "./user.type";

export interface IChannel {
   _id: string;
   name: string;
   creator: string;
   about: string;
   members: [
      {
         profile: IUser["profile"];
         _id: string;
         email: string;
      }
   ];
   createdAt: Date;
   updatedAt: Date;
   avatar: string;
}
