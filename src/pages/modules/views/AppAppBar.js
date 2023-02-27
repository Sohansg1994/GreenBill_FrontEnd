import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const [isTokenValid, setIsTokenValid] = React.useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const firstName = localStorage.getItem("firstName");
  const expirationTime = localStorage.getItem("accessTokenExpiration");
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  let navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const refreshAccessToken = async () => {
      console.log("checking");
      try {
        const response = await axios.get("http://localhost:8080/auth/token", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        const accessToken = response.data.data[0].accessToken;
        const expirationTime = response.data.data[0].atexTime;
        console.log(expirationTime);
        setIsTokenValid(true);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("accessTokenExpiration", expirationTime);
      } catch (error) {
        setIsTokenValid(false);
      }
    };

    function subtractMinutes(date, minutes) {
      date.setMinutes(date.getMinutes() - minutes);
    
      return date;
    }

    if (accessToken && expirationTime) {
      console.log("NowCheck1");
      const currentTime = new Date().getTime(); //expiration time have to calculate or should be received from backend
      const tokenExpTime = new Date().setTime(expirationTime);
      const expCheckingTime = subtractMinutes(tokenExpTime,5);

      if (currentTime < expCheckingTime) {
        setIsTokenValid(true);
      } else {
        refreshAccessToken(false);
      }
    }
  }, [accessToken, expirationTime, refreshToken]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize); // Identify the current screensize
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime"); //handle logout function
    setIsTokenValid(false);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 0 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 30, color: "secondary.main" }}
          >
            {"GreenBill"}
          </Link>

          <Box sx={{ flex: 1, ml: 5 }}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              sx={{ fontSize: 18, ml: 5 }}
            >
              {"HOME"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              sx={{ fontSize: 18, ml: 5 }}
            >
              {"Services"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              sx={{ fontSize: 18, ml: 5 }}
            >
              {"About us"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              sx={{ fontSize: 18, ml: 5 }}
            >
              {"Contacts"}
            </Link>
          </Box>

          {!isTokenValid && (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/signIn"
                sx={rightLink}
              >
                {"Sign In"}
              </Link>
              <Link
                variant="h6"
                underline="none"
                href="/Signup"
                sx={{ ...rightLink, color: "secondary.main" }}
              >
                {"Sign Up"}
              </Link>
            </Box>
          )}

          {isTokenValid && (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Link
                colour="white"
                underline="none"
                href="/projects"
                sx={{
                  ...rightLink,
                  fontSize: "0.9rem ",
                  "&:hover": { color: "secondary.light" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <MdPerson size="1.5rem" />
                  {screenWidth > 550 && (
                    <span sx={{ marginTop: "0.5rem" }}>
                      {"Hi " + firstName}
                    </span>
                  )}
                </Box>
              </Link>

              <Link
                variant="h6"
                underline="none"
                sx={{
                  ...rightLink,
                  color: "secondary.main",
                  marginTop: "0.8rem",
                }}
                onClick={handleLogout}
                href="/signin"
              >
                {"Log Out"}
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
