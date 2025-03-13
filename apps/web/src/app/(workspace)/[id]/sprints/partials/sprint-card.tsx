import { Badge } from "@/shared/ui/badge";

type Props = {
   sprint: any;
};
export default function SprintCard({ sprint }: Props) {
   return (
      <>
         <div className="p-3 border bg-white">
            <div className="grid grid-cols-2 items-center mb-3">
               <div>
                  <span className="text-xl block capitalize">{sprint?.title}</span>
               </div>
               <div className="text-end">
                  <Badge variant="outline" className="bg-white">
                     <span className="px-3 py-2 block capitalize">{sprint?.isComplete ? "Completed" : "Pending"}</span>
                  </Badge>
               </div>
            </div>
            {/* <div className="flex items-center my-2 gap-3">
               <span className="text-xs font-semibold">{percentage.toFixed()}%</span>
               <Progress value={percentage} className="w-full h-1 " />
            </div> */}
            <div className="grid grid-cols-2 gap-3 mb-3 text-[14px]">
               <div className="text-md capitalize">
                  <span className="text-gray-500">Started on </span> : {sprint?.started_on || "Na"}
               </div>
               <div className="text-md capitalize">
                  <span className="text-gray-500">End on </span> : {sprint?.end_on || "Na"}
               </div>
            </div>
            {/* <div className="grid grid-cols-2 gap-3 mb-3 text-[14px]">
               <div className="text-md capitalize">
                  <span className="text-gray-500">features </span> : {total_features}
               </div>
               <div className="text-md capitalize">
                  <span className="text-gray-500">completed </span> : {completed_features}
               </div>
            </div> */}
            <div>
               <p className="text-xs text-gray-500">{sprint?.description}</p>
            </div>
         </div>
      </>
   );
}
