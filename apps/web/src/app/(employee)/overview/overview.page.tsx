import { useAppSelector } from "@/api/store";
import { AvatarProfile } from "@/shared/components";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";

const workspaces = [
   {
      name: "Zavo App",
      image: "https://cdn.learnwoo.com/wp-content/uploads/2019/10/How-Magento-is-Beneficial-for-E-commerce-Business.jpg",
   },
   {
      name: "UPI Zone",
      image: "https://static.businessworld.in/Picture1_20250201185810_original_image_40.webp",
   },
   {
      name: "Chat UI",
      image: "https://www.mirrorfly.com/blog/wp-content/uploads/2021/09/Build-Realtime-chat-app.png",
   },
   {
      name: "Game VR",
      image: "https://vyrazu.com/wp-content/uploads/2021/01/How-to-Make-a-Game-App.jpg",
   },
];

export default function OverviewPage() {
   const { session } = useAppSelector((state) => state.authReducer);
   const authUser = session.data;
   return (
      <div>
         {/* <div className="text-center">
            <img src="https://www.witmates.com/static/media/logo.6ff17bef1e5cf3a6e888.webp" alt="logo" height={100} width={200} className="mx-auto d-block my-4" />
            <h1 className="text-2xl font-normal mb-2">
               Welcome to <br /> <span className="text-primary font-bold">Witmates Technologies</span>
            </h1>
         </div> */}
         <Card className="p-4">
            <div>
               <div className="mb-3 flex items-center gap-4">
                  <AvatarProfile //
                     src={authUser?.profile?.avatar}
                     fallBackTxt={`${authUser?.profile.first_name} ${authUser?.profile.last_name}`}
                     height="120px"
                     width="120px"
                  />
                  <div>
                     <span className="text-[20px] md:text-4xl font-bold capitalize flex items-center gap-3">
                        {authUser?.profile.first_name} {authUser?.profile.last_name}
                     </span>
                     <div className="text-md md:text-xl mb-2 text-gray-600">{authUser?.profile?.designation || "-"}</div>
                  </div>
               </div>
               <div className="grid grid-cols-12 text-sm gap-2 mt-3">
                  <div className="col-span-12 md:col-span-4">
                     <span className="text-[12px] md:text-[16px] flex gap-3 items-center">
                        <span className="font-semibold">Email :</span>
                        <span className="inline-block">{authUser?.email}</span>
                     </span>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                     <span className="text-[12px] md:text-[16px] flex gap-3 items-center">
                        <span className="font-semibold">linkedin Username :</span>
                        <span className="inline-block">
                           <a href={`https://www.linkedin.com/in/${authUser?.profile?.linkedin_username}`} target="_blank" rel="noopener noreferrer" className="inline-block underline">
                              {authUser?.profile?.linkedin_username}
                           </a>
                        </span>
                     </span>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                     <span className="text-[12px] md:text-[16px] flex gap-3 items-center">
                        <span className="font-semibold">Work Experience :</span>
                        <span className="inline-block">{authUser?.profile?.total_experience} year</span>
                     </span>
                  </div>
               </div>
               <span className="text-[12px] md:text-[15px] text-gray-600 block mt-3">{authUser?.profile.about}</span>
            </div>
            {/* Skill */}
            <div className="mt-[15px]">
               <h2 className="text-[17px] font-bold mb-2 text-primary">Skills</h2>
               <div className="flex items-center mt-2 gap-3 flex-wrap">
                  {authUser?.profile?.skills?.map((skill, idx) => (
                     <Badge //
                        variant="outline"
                        key={`employee-profile-skill-${idx}`}
                        className="border-[1px] border-primary text-primary">
                        <span className="py-1 px-3">{skill}</span>
                     </Badge>
                  ))}
               </div>
            </div>
         </Card>
         {/* workspaces */}
         <Card className="mt-2 p-4 mb-5">
            <h2 className="text-[17px] font-bold mb-2 text-primary">Workspaces</h2>
            <div className="grid grid-cols-12 gap-4">
               {workspaces?.map((workspace) => {
                  return (
                     <div className="col-span-6 md:col-span-3 relative">
                        <img src={workspace.image} alt="workspace" className="rounded-xl h-full w-full object-cover" />
                        <div className="h-full bg-[#0000008e] absolute top-0 left-0 w-full rounded-xl flex items-center justify-center">
                           <h3 className="text-md md:text-2xl text-center font-normal text-white">{workspace.name}</h3>
                        </div>
                     </div>
                  );
               })}
            </div>
         </Card>
      </div>
   );
}
