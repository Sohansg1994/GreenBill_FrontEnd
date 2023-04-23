import * as React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const ProductHeroLayoutRoot = styled('section')(({theme}) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '80vh',
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
});

function IntroductionLayout(props) {
  const {sxBackground, children} = props;
  const imageUrl = '/pexels-laura-penwell-3608056.jpg'
  // const imageUrl = 'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400'
  
  return (
    <ProductHeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
          // backgroundImage: "url('./public/pexels-laura-penwell-3608056.jpg')"
          // backgroundImage: `url(${imageUrl})`
        }}
      >
        {children}
        <Background sx={sxBackground}/>
      </Container>
    </ProductHeroLayoutRoot>
  );
}

IntroductionLayout.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default IntroductionLayout;
