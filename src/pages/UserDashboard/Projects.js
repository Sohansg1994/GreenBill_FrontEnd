import React from "react";
import Dashboard from "./components/Dashboard";
import withRoot from "../modules/withRoot";
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
