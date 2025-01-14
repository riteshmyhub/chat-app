import { IProfile } from "./auth-user.type";

export interface IMessage {
   attachments: IAttachment[];
   chat: string;
   from: string;
   to: string;
   isChannel: boolean;
   content: string;
   createdAt: string;
   _id: string;
   isRead: boolean;
}
export interface IAttachment {
   src: string | undefined;
   type: string;
   size: number;
   name: string;
}

export interface IMember {
   profile: IProfile;
   _id: string;
   email: string;
}

export interface IChatDetails {
   _id: string;
   groupChat: boolean;
   avatar: string;
   name: string;
   members: IMember[];
   about: string;
   creator: string;
}
