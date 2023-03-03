import { Container } from "@mui/system";
import React from "react";

import Grid from "@mui/material/Grid";

import ProjectList from "./ProjectList";
import ProjectCreate from "./ProjectCreate";

function ProjectView() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12} md={8} lg={9}>
        <ProjectList />
      </Grid>
    </Container>
  );
}

export default ProjectView;
