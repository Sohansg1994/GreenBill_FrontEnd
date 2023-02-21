import React from "react";
import Dashboard from "./components/Dashboard";
import withRoot from "D:/Proffession/ReactJs/GreenBill_FrontEnd/src/pages/modules/withRoot.js";
import ProjectView from "./components/ProjectView";

function Projects() {
  return (
    <React.Fragment>
      <Dashboard />
      <ProjectView />
    </React.Fragment>
  );
}

export default withRoot(Projects);
