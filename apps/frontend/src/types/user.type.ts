import { IRingtone } from "./notification.type";

export interface IUser {
   profile: IProfile;
   _id: string;
   email: string;
   isSetup: boolean;
   setting: ISetting;
}

export interface IProfile {
   first_name: string;
   last_name: string;
   avatar?: string;
   about?: string;
}

export interface ISetting {
   theme: string;
   pin?: string;
   notification_sound?: IRingtone;
   received_message_sound?: IRingtone;
   send_message_sound?: IRingtone;
}
