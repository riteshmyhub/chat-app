export interface IAuthUser {
   _id: string;
   email: "ryitesh94@gmail.com";
   profile: IAuthProfile;
}

export interface IAuthProfile {
   first_name: string;
   last_name: string;
   designation: string;
   skills: string[];
   total_experience: number;
   dateOfJoining: string;
   about: string;
   linkedin_username: string;
   avatar: string;
}

export interface IProfile {
   first_name: string;
   last_name: string;
   avatar?: string;
   about?: string;
}
