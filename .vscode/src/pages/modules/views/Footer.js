import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];

// const useStyles = makeStyles((theme) => ({
//   rootBox: {
//     [theme.breakpoints.down('md')]: {
//       justifyContent: 'center'
//     }
//   },
//   footerNav: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginRight: 'auto',
//     marginLeft: theme.spacing(3),
//     marginBottom: theme.spacing(0),
//
//     [theme.breakpoints.down('md')]: {
//       width: '100%',
//       marginLeft: 'auto',
//       marginTop: theme.spacing(3),
//       marginBottom: theme.spacing(2),
//     }
//   },
//   footerLink: {
//     marginLeft: theme.spacing(3),
//     marginRight: theme.spacing(3),
//     [theme.breakpoints.down('md')]: {
//       marginBottom: theme.spacing(2),
//     }
//   },
// }));

export default function Footer() {
  const content = {
    'brand': {image: 'nereus-assets/img/nereus-light.png', width: 110},
    'copy': '© 2020 Nereus All rights reserved.',
    'link1': 'First Link',
    'link2': 'Second Link',
    'link3': 'Third Link',
    'link4': 'Fourth Link'
  };
  
  let brand;
  
  if (content.brand.image) {
    brand = <img src={content.brand.image} alt="" width={content.brand.width}/>;
  } else {
    brand = content.brand.text || '';
  }
  
  
  return (
    <footer>
      <Container maxWidth={false} sx={{my: 8, display: 'flex', backgroundColor: '#94AF9F', justifyContent: 'center'}}>
        <Box sx={{py: 4, width: '80%', backgroundColor: '#999'}}>
          <p>slfkjsd lkfjdfk jsdlfkjd</p>
        </Box>
      </Container>
    </footer>
  );
}
