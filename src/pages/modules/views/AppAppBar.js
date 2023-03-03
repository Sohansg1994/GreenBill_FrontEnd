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
  const aToken = localStorage.getItem("accessToken");
  const rToken = localStorage.getItem("refreshToken");
  const eTime = localStorage.getItem("accessTokenExpiration");
  const fname = localStorage.getItem("firstName");

  const [accessToken, setAccessToken] = React.useState(aToken);
  const [refreshToken, setRefreshToken] = React.useState(rToken);
  const [expirationTime, setExpirationTime] = React.useState(eTime);
  const [firstName, setFirstName] = React.useState(fname);

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  let navigate = useNavigate();

  /*useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expirationTime");
    console.log("outside Access " + accessToken);
    console.log("outside Refresh " + refreshToken);
  });*/

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/token", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        if (response.data.status === 200) {
          const newAccessToken = response.data.data[0].accessToken;
          const newExpirationTime = response.data.data[0].atexTime;

          setIsTokenValid(true);

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("accessTokenExpiration", newExpirationTime);
          setAccessToken(newAccessToken);
          setExpirationTime(newExpirationTime);
        }
      } catch (error) {
        setIsTokenValid(false);
      }
    };

    if (accessToken != null && expirationTime != null) {
      const currentTime = new Date().getTime(); //expiration time have to calculate or should be received from backend
      //console.log(currentTime - expirationTime);
      if (currentTime < expirationTime) {
        setIsTokenValid(true);
      } else {
        refreshAccessToken();
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

  const handleLogout = async () => {
    setIsTokenValid(false);
    const accessToken1 = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "http://localhost:8080/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken1}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("firstName");
        setAccessToken(null);
        setRefreshToken(null);
        setExpirationTime(null);
        setFirstName(null);
        navigate("/signIn");
      }
    } catch (error) {
      console.log("Error");
    }
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
                // href="/signin"
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
