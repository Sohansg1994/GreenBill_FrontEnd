import { Container } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";

function ProjectCreate() {
  const Type = [
    { label: "Domestic", id: 1 },
    { label: "Industry", id: 2 },
  ];

  return (
    <Container
      component={Paper}
      sx={{
        mt: 4,
        mb: 4,
        pb: 4,
        pt: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Project Name"
        sx={{ width: "30%" }}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Type}
        sx={{ width: "30%" }}
        renderInput={(params) => <TextField {...params} label="Type" />}
      />
      <Button variant="contained" sx={{ width: "30%" }}>
        Create
      </Button>
    </Container>
  );
}

export default ProjectCreate;
