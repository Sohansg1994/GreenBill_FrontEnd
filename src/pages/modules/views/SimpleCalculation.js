import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";
import TextField from "@mui/material/TextField";
import { Divider, Paper } from "@mui/material";

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

const styles = {
  backgroundImage:
    "url(https://images.unsplash.com/photo-1529854140025-25995121f16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
  width: "100%",
};

function SimpleCalculation() {
  const [unitNumber, setUnitNumber] = useState("");
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "#ffff", overflow: "hidden" }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          columnGap: 5,
          ml: 25,
          mt: 0,

          width: "100%",
        }}
      >
        <Box sx={{ width: "50%", mt: 10, mb: 15 }}>
          <Typography
            variant="h4"
            marked="center"
            component="h2"
            sx={{ mb: 14 }}
          >
            Check You Electricity Bill
          </Typography>
          <div>
            <Box>
              <TextField
                label="Unit No"
                variant="outlined"
                fullWidth
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
              />
            </Box>
          </div>
          <Button
            color="secondary"
            size="large"
            variant="contained"
            component="a"
            href="/premium-themes/onepirate/sign-up/"
            sx={{ mt: 8 }}
          >
            Calculate
          </Button>
        </Box>

        <Box sx={styles}>
          <Typography>Results</Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default SimpleCalculation;
