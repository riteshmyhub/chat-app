import { IMember } from "./channel.type";

export interface IAttachment {
   src: string | undefined;
   type: string;
   size: number;
   name: string;
}

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

export interface IChatDetails {
   _id: string;
   groupChat: boolean;
   avatar: string;
   name: string;
   members: IMember[];
   about: string;
   creator: string;
}
