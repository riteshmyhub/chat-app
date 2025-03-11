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
export default function WorkspacesPage() {
   return (
      <Card className="mt-2 p-4">
         <div className="grid grid-cols-12 gap-4">
            {workspaces?.map((workspace) => {
               return (
                  <div className="col-span-12 md:col-span-4 relative">
                     <img src={workspace.image} alt="workspace" className="rounded-xl h-full w-full object-cover" />
                     <div className="h-full bg-[#0000008e] absolute top-0 left-0 w-full rounded-xl flex items-center justify-center">
                        <h3 className="text-md md:text-2xl text-center font-normal text-white">{workspace.name}</h3>
                     </div>
                  </div>
               );
            })}
         </div>
      </Card>
   );
}
