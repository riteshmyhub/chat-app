import { IMember } from "./channel.type";

export interface IAttachment {
   src: string | undefined;
   type: string;
   size: number;
   name: string;
}
export interface IMessage {
   groupChat: boolean;
   sender: {
      _id: string;
      name: string;
      avatar: string;
   };
   chat: string;
   content: string;
   createdAt: Date;
   creator: string;
   attachments: IAttachment[];
   seen: boolean;
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
