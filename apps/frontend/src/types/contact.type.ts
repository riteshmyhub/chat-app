import { IUser } from "@/types/user.type";
export interface IContact {
   profile: IUser["profile"];
   _id: string;
   email: string;
}
