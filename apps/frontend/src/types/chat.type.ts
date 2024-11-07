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

export interface IMember {
   profile: IProfile;
   _id: string;
   email: string;
}

export type IChatContact = IMember;

export interface IProfile {
   avatar: string;
   first_name: string;
   last_name: string;
   about?: string;
}

export interface ITyping {
   chatID: string | null;
   text: string;
}
