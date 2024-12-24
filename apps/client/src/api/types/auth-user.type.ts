export interface IAuthUser {
   profile: IProfile;
   _id: string;
   email: string;
}
export interface IProfile {
   first_name: string;
   last_name: string;
   avatar?: string;
   about?: string;
}
