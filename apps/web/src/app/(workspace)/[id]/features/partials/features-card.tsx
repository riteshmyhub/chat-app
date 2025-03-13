import { Button } from "@/shared/ui/button";
import { BookAIcon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shared/ui/alert-dialog";
import { Badge } from "@/shared/ui/badge";

export default function FeaturesCard({ feature }: { feature: any }) {
   return (
      <AlertDialog>
         <div className="p-3 border bg-white">
            <div className="flex items-center justify-between">
               <span className="text-lg block mb-2">{feature?.title}</span>
               <div className="text-end">
                  <Badge variant="outline" className="bg-white">
                     <span className="px-3 py-2 block capitalize">
                        {feature?.isCompleted ? "Completed" : "Pending"}
                     </span>
                  </Badge>
               </div>
            </div>
            <p className="text-xs mb-3">{feature?.description}</p>
            {/* <div className="flex items-center my-2 gap-3">
               <span className="text-xs font-semibold">{percentage.toFixed()}%</span>
               <Progress value={percentage} className="w-full h-1 " />
            </div> */}
            <AlertDialogTrigger>
               <Button variant="outline" size="sm">
                  <BookAIcon size={15} />
                  Feature Note
               </Button>
            </AlertDialogTrigger>
         </div>
         <AlertDialogContent className="max-w-[900px] bg-white">
            <AlertDialogHeader>
               <AlertDialogTitle className="text-2xl">Feature Details</AlertDialogTitle>
               <AlertDialogDescription>
                  <hr className="my-3" />
                  <div className="mb-3">
                     <span className="block text-lg capitalize mb-2">title</span>
                     <div className="border p-3">{feature?.title}</div>
                  </div>
                  <div className="mb-3">
                     <span className="block text-lg capitalize mb-2">description</span>
                     <div className="border p-3">{feature?.description}</div>
                  </div>
                  <div className="mb-3">
                     <span className="block text-lg capitalize mb-2">notes</span>
                     <div className="border p-3" dangerouslySetInnerHTML={{ __html: feature?.note }} />
                  </div>
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
