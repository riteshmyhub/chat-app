import { useNavigate } from "react-router";

const workspaces = [
   {
      id: 2,
      name: "UPI Zone",
      image: "https://static.businessworld.in/Picture1_20250201185810_original_image_40.webp",
   },
   {
      id: 3,
      name: "Chat UI",
      image: "https://www.mirrorfly.com/blog/wp-content/uploads/2021/09/Build-Realtime-chat-app.png",
   },
   {
      id: 4,
      name: "Game VR",
      image: "https://vyrazu.com/wp-content/uploads/2021/01/How-to-Make-a-Game-App.jpg",
   },
];
export default function WorkspacesPage() {
   const navigate = useNavigate();
   return (
      <div className="p-[20px] h-screen overflow-y-auto">
         <div className="flex items-center justify-between pb-6">
            <span className="text-4xl font-medium capitalize block">workspaces</span>
         </div>
         <div>
            <div className="grid grid-cols-12 gap-4">
               {workspaces?.map((workspace) => {
                  return (
                     <button onClick={() => navigate(`/workspaces/${workspace.id}`)} className="col-span-12 md:col-span-4 relative">
                        <img src={workspace.image} alt="workspace" className="rounded-xl h-full w-full object-cover" />
                        <div className="h-full bg-[#0000008e] absolute top-0 left-0 w-full rounded-xl flex items-center justify-center">
                           <h3 className="text-md md:text-2xl text-center font-normal text-white">{workspace.name}</h3>
                        </div>
                     </button>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
