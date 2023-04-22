import { createTheme } from '@mui/material/styles';
import { green, grey, red } from '@mui/material/colors';

const mdTheme = createTheme({
  palette: {
    primary: {
      light: '#69696a',
      main: '#28282a',
      dark: '#1e1e1f',
    },
    secondary: {
      light: '#fff5f8',
      main: '#ff3366',
      dark: '#e62958',
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
  },
});

const fontHeader = {
  color: mdTheme.palette.text.primary,
  fontWeight: mdTheme.typography.fontWeightMedium,
  fontFamily: "'Montserrat', 'Roboto Condensed', sans-serif",
  textTransform: 'uppercase',
};

const theme = {
  ...mdTheme,
  palette: {
    ...mdTheme.palette,
    background: {
      ...mdTheme.palette.background,
      default: mdTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...mdTheme.typography,
    fontHeader,
    h1: {
      ...mdTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...mdTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...mdTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...mdTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...mdTheme.typography.h5,
      fontSize: 20,
      fontWeight: mdTheme.typography.fontWeightLight,
    },
    h6: {
      ...mdTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...mdTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...mdTheme.typography.body2,
      fontWeight: mdTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...mdTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;
