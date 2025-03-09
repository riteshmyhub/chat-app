import { Image } from "@/shared/components";
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

export default function HomePage() {
   return (
      <div className="h-full overflow-y-auto bg-white p-[15px]">
         {/* <div className="text-center">
            <img src="https://www.witmates.com/static/media/logo.6ff17bef1e5cf3a6e888.webp" alt="logo" height={100} width={200} className="mx-auto d-block my-4" />
            <h1 className="text-2xl font-normal mb-2">
               Welcome to <br /> <span className="text-primary font-bold">Witmates Technologies</span>
            </h1>
         </div> */}
         <Card className="p-3">
            <h2 className="text-[20px] font-bold mb-4">Profile</h2>
            <div>
               <div className="mb-3 flex items-center gap-4">
                  <Image //
                     src="/images/person-placeholder.png"
                     alt="profile"
                     className="rounded-full  h-[75px] md:h-[100px] w-[75px] md:w-[100px]"
                  />
                  <div>
                     <div className="text-lg md:text-4xl font-semibold capitalize flex items-center gap-3">
                        <span>ritesh goswami</span>
                     </div>
                     <div className="text-md md:text-xl mb-2 text-gray-600">react develpoer</div>
                  </div>
               </div>
               <div className="grid grid-cols-12 text-sm gap-2 mt-3">
                  <div className="col-span-12 md:col-span-4">
                     <span className="text-[12px] md:text-[16px] flex gap-3 items-center">
                        <span className="font-semibold">Email :</span>
                        <span className="inline-block">ryitesh94@gmail.com</span>
                     </span>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                     <span className="text-[12px] md:text-[16px] flex gap-3 items-center">
                        <span className="font-semibold">linkedin Username :</span>
                        <span className="inline-block">
                           <a href={`https://www.linkedin.com/in/linkedin`} target="_blank" rel="noopener noreferrer" className="inline-block underline">
                              linkedin
                           </a>
                        </span>
                     </span>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                     <span className="text-[12px] md:text-[16px] flex gap-3 items-center">
                        <span className="font-semibold">Work Experience :</span>
                        <span className="inline-block">3 year</span>
                     </span>
                  </div>
               </div>
               <div className="mt-4">
                  <span className="text-[12px] md:text-[15px] text-gray-600">
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident enim repellendus quam, suscipit eligendi, ipsum perspiciatis nihil vel adipisci cum corrupti quod recusandae et
                     voluptates error cumque porro! Nostrum, atque!
                  </span>
               </div>
            </div>
         </Card>
         {/* Skill */}
         <Card className="mt-[20px] p-3">
            <h2 className="text-[20px] font-bold mb-4">Skills</h2>
            <div className="flex items-center mt-2 gap-3 flex-wrap">
               {["react", "java", "python"]?.map((skill, idx) => (
                  <Badge variant="outline" key={`employee-profile-skill-${idx}`} className="text-gray-800 bg-gray-200">
                     <span className="py-1 px-3">{skill}</span>
                  </Badge>
               ))}
            </div>
         </Card>
         {/* workspaces */}
         <Card className="mt-[20px] p-3">
            <h2 className="text-[20px] font-bold mb-4">Workspaces</h2>
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
