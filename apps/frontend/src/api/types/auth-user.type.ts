export interface IAuthUser {
   _id: string;
   email: "ryitesh94@gmail.com";
   profile: IProfile;
}
export interface IProfile {
   first_name: string;
   last_name: string;
   avatar?: string;
   about?: string;
}
