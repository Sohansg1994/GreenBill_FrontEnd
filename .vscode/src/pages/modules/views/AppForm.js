import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '../components/Paper';

function AppForm(props) {
  const {children} = props;
  
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#94AF9F',
        height: 1
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{mt: 7, mb: 12}}>
          <Paper sx={{
            my: {xs: 14, md: 14},
            py: {xs: 4, md: 8},
            px: {xs: 3, md: 6},
            backgroundColor: '#FBFBFB',
            borderRadius: 2
          }}>
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

AppForm.propTypes = {
  children: PropTypes.node,
};

export default AppForm;
