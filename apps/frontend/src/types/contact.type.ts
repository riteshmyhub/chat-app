import { IProfile } from "./user.type";

export interface IContact {
   _id: string;
   chatID: string;
   about: string;
   avatar: string;
   name: string;
   email: string;
   creator: string;
}
export interface ISearchContact {
   profile: IProfile;
   _id: string;
   email: string;
}
