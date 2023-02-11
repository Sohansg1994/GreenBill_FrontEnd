import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import { MdPerson } from "react-icons/md";



const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const [isTokenValid, setIsTokenValid] = React.useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const expirationTime = localStorage.getItem('accessTokenExpiration');
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);



  useEffect(() => {
    if (accessToken && expirationTime) {
      const currentTime = new Date().getTime();   //expiration time have to calculate or should recieved from backend
      if (currentTime < expirationTime) {
        setIsTokenValid(true);
        
      }
    }
  }, [accessToken, expirationTime]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);           // Identify the current screensize
    };
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');                      //handle logout function
    setIsTokenValid(false);
  };


  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'GreenBill'}
          </Link>
          {!isTokenValid && (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/signIn"
                sx={rightLink}
              >
                {'Sign In'}
              </Link>
              <Link
                variant="h6"
                underline="none"
                href="/Signup"
                sx={{ ...rightLink, color: 'secondary.main' }}
              >
                {'Sign Up'}
              </Link>
            </Box>
          )}

          {isTokenValid && (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>

             
                <Link
                  colour='white'
                 
                  underline="none"
                  href="/projects"
                  sx={{ ...rightLink, fontSize: '0.9rem ','&:hover':{color: 'secondary.light',} }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <MdPerson size='1.5rem' />
                    {screenWidth > 550 && (
                      <span sx={{ marginTop: '0.5rem' }}>{'Hi Sohan'}</span>
                    )}
                  </Box>
                </Link>
    
              <Link
                variant="h6"
                underline="none"
                
                sx={{ ...rightLink, color: 'secondary.main', marginTop:'0.8rem' }}
                onClick={handleLogout}
                href="/signin"
              >
                {'Log Out'}
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
