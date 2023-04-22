import React from 'react'
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';
import withRoot from "../modules/withRoot";

function Projects() {
  return (
    <React.Fragment>
        <Dashboard/>
        <ProjectView/>
        
    </React.Fragment>

  )
}

export default withRoot(Projects);
