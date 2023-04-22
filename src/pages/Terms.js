import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from './modules/components/Markdown';
import Typography from './modules/components/Typography';
import Header from './modules/views/Header';
import Footer from './modules/views/Footer';
import withRoot from './modules/withRoot';
import terms from './modules/views/terms.md';

function Terms() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default withRoot(Terms);
