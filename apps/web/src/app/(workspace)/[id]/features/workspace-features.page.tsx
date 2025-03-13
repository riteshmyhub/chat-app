import React from "react";
import FeaturesCard from "./partials/features-card";
import projectMock from "../mocks/projects";

export default function WorkspaceFeaturesPage() {
   return projectMock?.sprints?.map((sprint, idx) => (
      <React.Fragment key={`feature-${idx}`}>
         <span className="block text-md capitalize text-gray-600 my-2">{sprint.title}</span>
         {projectMock?.features?.filter((f) => f.sprint === sprint.title)?.length ? (
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2">
               <React.Fragment>
                  {projectMock?.features
                     ?.filter((f) => f.sprint === sprint.title)
                     ?.map((feature) => (
                        <React.Fragment key={feature?._id}>
                           <FeaturesCard feature={feature} />
                        </React.Fragment>
                     ))}
               </React.Fragment>
            </div>
         ) : (
            <div className="bg-white p-3">No Features</div>
         )}
      </React.Fragment>
   ));
}
