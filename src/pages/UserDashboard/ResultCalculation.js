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
import { TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffff",
    color: theme.palette.common.white,
    fontSize: 16,
    border: "none",
    padding: 3,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    border: "none",
    padding: 3,
  },
}));

/*const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {},
  "&:first-child td, &:first-child th": {},
  "&:last-child td, &:last-child th": {},
  "& > *": {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  border: "none",
}));*/

function createData(description, amount) {
  return { description, amount };
}

const ResultCalculation = (props) => {
  const [isResultUpdated, setIsResultUpdated] = useState(false);
  const { projectId } = props;
  const [isProject, setIsProject] = useState(false);
  const [calculationSteps, setCalculationSteps] = useState([]);
  const [units, setUnits] = useState("");

  const [rows, setRows] = useState([
    createData("Total Units", ""),
    createData("Usage Charge", ""),
    createData("Total Charge", ""),
    createData("Tax", ""),
    createData("Bill Amount", ""),
  ]);

  useEffect(() => {
    setIsProject(props.isProject);
  });

  const handleCalculation = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    try {
      const response = await axios.get(
        `http://localhost:8080/playground/bill?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        setCalculationSteps(response.data.data[0].calculationSteps);
        setUnits(response.data.data[0].totalUnits);
        const updatedRows = [
          createData("Usage Charge", response.data.data[0].usageCharge),
          createData("Total Charge", response.data.data[0].totalCharge),
          createData("Tax", response.data.data[0].levy),

          createData("Bill Amount", response.data.data[0].billAmount),
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
        mt: 2,

        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      {isProject && (
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
            sx={{ width: "60%", justifyItems: "center" }}
          >
            Calculate
          </Button>

          {isResultUpdated && (
            <TableContainer sx={{ mt: 3 }}>
              <Table
                sx={{
                  minWidth: 500,
                  width: "60%",
                  mx: "auto",
                  borderColor: "#fff",
                  border: "none", // Add this line to remove the border
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableCell>Total Units</StyledTableCell>
                  <StyledTableCell align="right">{units}</StyledTableCell>
                  {calculationSteps.map((steps) => (
                    <TableRow
                      sx={{
                        border: "none",
                      }}
                    >
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ width: "40%" }}
                      ></StyledTableCell>
                      <StyledTableCell align="right">
                        <span style={{ fontWeight: "revert" }}>{steps}</span>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
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
                      <StyledTableCell align="right">
                        {row.description === "Bill Amount" ? (
                          <span style={{ fontWeight: "bold" }}>
                            {row.amount}
                          </span>
                        ) : (
                          row.amount
                        )}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </Box>
  );
};

export default withRoot(ResultCalculation);
