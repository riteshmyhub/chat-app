import React from "react";
import SprintCard from "./partials/sprint-card";
import projectMock from "../mocks/projects";

export default function WorkspaceSprintsPage() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
         {projectMock?.sprints?.map((sprint, idx) => {
            return (
               <React.Fragment key={`sprint-${idx}`}>
                  <SprintCard sprint={sprint} />
               </React.Fragment>
            );
         })}
      </div>
   );
}
