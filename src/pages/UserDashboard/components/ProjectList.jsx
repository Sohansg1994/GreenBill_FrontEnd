import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ProjectCreate from "./ProjectCreate";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#28282a",
    color: theme.palette.common.white,
    fontSize: 17,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProjectList() {
  const accessToken = localStorage.getItem("accessToken");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = async () => {
    console.log("Here");
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      "http://localhost:8080/test/project/getAll",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setProjects(response.data.data[0]);
  };

  const handleDelete = async (projectId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/test/project?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getProjectList();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Last Update Date</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <StyledTableRow key={project.projectId}>
                <StyledTableCell component="th" scope="row">
                  {project.projectName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {project.projectType}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {project.lastUpdated}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ mr: 2 }}
                      href={`/projectdetails?projectName=${project.projectName}&projectId=${project.projectId}`}
                    >
                      View
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(project.projectId)}
                    >
                      Delete
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div sx={{ mt: 4, mb: 4 }}>
        <ProjectCreate getProjectList={getProjectList} />
      </div>
    </React.Fragment>
  );
}
