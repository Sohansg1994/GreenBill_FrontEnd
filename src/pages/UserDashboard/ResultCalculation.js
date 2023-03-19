import { Box } from "@mui/system";

import React, { useEffect, useState } from "react";
import withRoot from "D:/Proffession/ReactJs/GreenBill_FrontEnd/src/pages/modules/withRoot.js";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#28282a",
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {},
  // hide last border
  "&:last-child td, &:last-child th": { border: 0 },
  border: "1px solid #ddd",
}));

function createData(description, equal, amount) {
  return { description, equal, amount };
}

const ResultCalculation = (props) => {
  const [isResultUpdated, setIsResultUpdated] = useState(false);
  const { projectId } = props;
  const [rows, setRows] = useState([
    createData("Total Units", "=", ""),
    createData("Usage Charge", "=", ""),
    createData("Total Charge", "=", ""),
    createData("Tax", "=", ""),
    createData("Bill Amount", "=", ""),
  ]);

  const handleCalculation = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:8080/play_ground/bill?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);

        const updatedRows = [
          createData("Total Units", "=", response.data.data[0].totalUnits),
          createData("Usage Charge", "=", response.data.data[0].usageCharge),
          createData("Total Charge", "=", response.data.data[0].totalCharge),
          createData("Tax", "=", response.data.data[0].levy),
          createData("Bill Amount", "=", response.data.data[0].billAmount),
        ];

        setRows(updatedRows);
        setIsResultUpdated(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        mt: 3,

        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        p={3}
        sx={{
          mt: 5,
          mb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={handleCalculation}
          sx={{ width: "75%", justifyItems: "center" }}
        >
          Calculate
        </Button>

        {isResultUpdated && (
          <TableContainer sx={{ mt: 3 }}>
            <Table
              sx={{
                minWidth: 500,
                width: "75%",
                mx: "auto",
                borderColor: "#fff",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      border: "none",
                    }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ width: "40%" }}
                    >
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="right" sx={{ width: "10%" }}>
                      {row.equal}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.amount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default withRoot(ResultCalculation);
