import { Image } from "@/shared/components";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import projectMock from "../mocks/projects";

export default function WorkspaceOverviewPage() {
   return (
      <div className="grid grid-cols-12 gap-4">
         <div className="col-span-12 md:col-span-8">
            <Card className="rounded-none relative">
               <Image src={projectMock?.image} alt="project-image" className="w-full block" height={100} width={100} />
               <div className="p-4">
                  <div className="mt-4">
                     <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                        <div className="text-sm text-gray-600">Name : {projectMock?.name}</div>
                        <div className="text-sm text-gray-600">Created At : {projectMock?.createdAt}</div>
                        <div className="text-sm text-gray-600">Release plan : {projectMock?.release_plan}</div>
                        <div className="text-sm text-gray-600">Platform : {projectMock?.platform}</div>
                        <div className="text-sm text-gray-600">Team Strength : {projectMock?.teams?.length}</div>
                        <div className="text-sm text-gray-600">features : 40</div>
                     </div>
                  </div>
                  <div className="mt-4">
                     <div className="text-sm text-gray-600 mb-2">Technologies</div>
                     <div className="flex flex-wrap gap-2">
                        {projectMock?.technologies?.map((technology) => (
                           <Badge variant="outline">
                              <span className="px-3 py-1 block capitalize">{technology}</span>
                           </Badge>
                        ))}
                     </div>
                  </div>
                  <div className="mt-4">
                     <div className="text-sm text-gray-600 mb-2">Description</div>
                     <p className="text-sm text-gray-900">{projectMock?.description}</p>
                  </div>
               </div>
            </Card>
         </div>
         <div className="col-span-12 md:col-span-4">
            <Card className="p-3">
               {projectMock?.teams?.map((member) => (
                  <div className="flex items-center gap-3">
                     <Image //
                        src={member?.avatar}
                        height={45}
                        width={45}
                        alt="profile"
                        className="rounded-full block"
                     />
                     <div>
                        <span className="text-xs block font-semibold capitalize">
                           {member?.name} ( {member?.designation} )
                        </span>
                        <span className="text-xs block text-gray-500">{member?.email}</span>
                     </div>
                  </div>
               ))}
            </Card>
            <Card className="p-3 mt-4">
               <div>
                  {projectMock?.sprints?.map((sprint) => (
                     <div key={sprint._id} className="flex justify-between items-center mt-2">
                        <small className="block">{sprint?.title}</small>
                        <Badge variant="outline">{sprint?.isCompleted ? "Completed" : "Pending"}</Badge>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
   );
}
