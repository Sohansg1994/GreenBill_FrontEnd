import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

function ProjectCreate() {
  const Type = [
    { label: "Domestic", id: 1 },
    { label: "Industry", id: 2 },
  ];

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  /* const [data, setData] = useState("");

  useEffect(() => {
    setData({ projectName, projectType });
  }, [projectName, projectType]);

  useEffect(() => {
    console.log(data);
  });*/

  const handleSubmit = async () => {
    console.log(accessToken);
    const data = {
      name: projectName,
      type: projectType,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios
      .post("http://localhost:8080/test/project/create", data, config)
      .then((response) => {
        console.log(response);
        // handle successful response
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

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
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Type}
        sx={{ width: "30%" }}
        value={projectType}
        renderInput={(params) => <TextField {...params} label="Type" />}
        onChange={(event, newValue) => {
          setProjectType(newValue?.label || "");
        }}
      />
      <Button variant="contained" sx={{ width: "30%" }} onClick={handleSubmit}>
        Create
      </Button>
    </Container>
  );
}

export default ProjectCreate;
