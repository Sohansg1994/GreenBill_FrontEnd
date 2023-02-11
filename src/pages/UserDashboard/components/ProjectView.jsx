import { Container } from '@mui/system'
import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ProjectList from './ProjectList';
import ProjectCreate from './ProjectCreate';



  

function ProjectView() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} md={8} lg={9}>
         <ProjectList/>
         <ProjectCreate/>
    
        </Grid>
    </Container>
  )
}

export default ProjectView
