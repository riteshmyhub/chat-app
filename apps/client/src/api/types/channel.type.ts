import { IProfile } from "./auth-user.type";

export interface IChannel {
   _id: string;
   name: string;
   admin: string;
   about: string;
   members: IMember[];
   createdAt: Date;
   updatedAt: Date;
   avatar: string;
}
export interface IMember {
   profile: IProfile;
   _id: string;
   email: string;
}
