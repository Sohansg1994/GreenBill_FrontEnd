import React, { useEffect, useState } from "react";
import withRoot from "D:/Proffession/ReactJs/GreenBill_FrontEnd/src/pages/modules/withRoot.js";
import axios from "axios";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    color: theme.palette.common.black,
    fontSize: 15,
    padding: 3,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    padding: 5,
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

function SectionComponents(props) {
  const { selectedNode } = props;
  const [isSection, setIsSection] = useState(false);
  const [sectionComponents, setSectionComponents] = useState([]);

  const getSectionComponents = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("here");
    const response = await axios.get(
      `http://localhost:8080/playground/section?frontEndId=${selectedNode}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data.children);
    setSectionComponents(response.data.children);
  };

  const handleDelete = async (nodeId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `http://localhost:8080/node?frontEndId=${nodeId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    console.log(isSection);
    setIsSection(props.isSection);

    if (isSection) {
      getSectionComponents();
    }
  });
  return (
    <>
      {
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Component</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sectionComponents.map((component) => (
                <TableRow key={component.frontEndId}>
                  <StyledTableCell component="th" scope="row">
                    {component.nodeType === "Section" ? (
                      <span>
                        {component.name.substring(0, component.name.length - 9)}
                      </span>
                    ) : (
                      <span>{component.name}</span>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {component.nodeType}
                  </StyledTableCell>

                  <StyledTableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(component.frontEndId)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}
export default withRoot(SectionComponents);
