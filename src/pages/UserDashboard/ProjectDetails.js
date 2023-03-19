import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import withRoot from "D:/Proffession/ReactJs/GreenBill_FrontEnd/src/pages/modules/withRoot.js";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import { makeStyles } from "@mui/material";
import axios from "axios";
import ResultCalculation from "./ResultCalculation.js";
function ProjectDetails() {
  //get project name from Project page
  const location = useLocation();
  const projectName = new URLSearchParams(location.search).get("projectName");
  const projectId = new URLSearchParams(location.search).get("projectId");
  const userId = localStorage.getItem("userId");

  const [inputName, setInputName] = useState("");

  const [selectedType, setSelectedType] = useState(0);

  const [selectedApplianceType, setSelectedApplianceType] = useState(0);

  const [wattCapacity, setWattCapacity] = useState("");

  const [quantity, setQuantity] = useState("");

  const [hours, setHours] = useState("");

  const [isNodeNumberExceed, setisNodeNumberExceed] = useState(false);

  const [data, setData] = useState({
    frontEndId: "root",
    name: projectName,
    nodeType: "Main",
    children: [],
  });

  const [selectedNode, setSelectedNode] = useState("root");

  const [counter, setCounter] = useState(0);

  //Appliance or not

  const [isAppliance, setIsAppliance] = useState(false);

  const isOptionEqualToValue = (option, value) => option.id === value.id;

  const type = [
    { label: "Section", id: 1 },
    { label: "Appliance", id: 2 },
  ];

  const applianceType = [
    { label: "Fan", id: 1 },
    { label: "Light", id: 2 },
    { label: "Kitchen Appliance", id: 3 },
  ];

  //to generate custom node id
  const generateNodeId = () => {
    setCounter((prevCounter) => prevCounter + 1);
    return `${userId}_${projectId}_${Date.now()}_${counter}`;
  };

  //for select node
  const handleNodeSelect = (event, nodeId, nodetype) => {
    event.preventDefault();

    //to disable the add button if node type is appliance
    if (nodetype === "Section" || nodetype === "Main") {
      setIsAppliance(false);
    } else {
      setIsAppliance(true);
    }

    setSelectedNode(nodeId);
    console.log(selectedNode);
  };

  //For render Treeview
  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.frontEndId}
      nodeId={nodes.frontEndId}
      nodetype={nodes.nodeType}
      label={
        nodes.selectedType === 2
          ? `${nodes.name} - Watt Capacity: ${nodes.wattCapacity} - Hours: ${nodes.hours} - Quantity: ${nodes.quantity} `
          : nodes.name
      }
      onClick={(event) =>
        handleNodeSelect(event, nodes.frontEndId, nodes.nodeType)
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const getData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(
      `http://localhost:8080/project/?projectId=${projectId}`,
      config
    );
    console.log(response.data.root);
  };

  const addNode = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (selectedType.id === 1) {
      let label = `${inputName} (${selectedType.label})`;
      let type = `${selectedType.label}`;
      let frontEndId = generateNodeId();

      const nodeSectionData = {
        frontEndId: frontEndId,
        nodeType: type,
        parentFrontEndId: selectedNode,
        name: label,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/node/add",
          nodeSectionData,
          config
        );
        if (response.status === 200) {
          handleAdd(nodeSectionData);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (selectedType.id === 2) {
      let label = `${inputName} (${selectedApplianceType.label})`;
      let type = `${selectedType.label}`;
      let applianceCategory = `${selectedApplianceType.label}`;

      let frontEndId = generateNodeId();

      let applianceHours = hours;

      let wattRate = wattCapacity;

      let applianceQuantity = quantity;

      const nodeApplianceData = {
        frontEndId: frontEndId,
        nodeType: type,
        parentFrontEndId: selectedNode,
        name: label,
        wattRate: wattRate,
        hours: applianceHours,
        quantity: applianceQuantity,
        applianceType: applianceCategory,
      };
      console.log(nodeApplianceData);

      try {
        const response = await axios.post(
          "http://localhost:8080/node/add",
          nodeApplianceData,
          config
        );
        if (response.status === 200) {
          handleAdd(nodeApplianceData);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const deleteNode = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let nodeId = selectedNode;
    try {
      const response = await axios.delete(
        `http://localhost:8080/node?frontEndId=${nodeId}`,
        config
      );
      if (response.status === 200) {
        handleDelete(nodeId);
      }
    } catch {}
  };

  // Node adding function
  const handleAdd = (nodeData) => {
    setData((prevData) => {
      let newData = { ...prevData };
      let node = findNode(newData, nodeData.parentFrontEndId);

      if (!node.children) {
        node.children = [];
      }
      //limiting section numbers
      /* if (selectedType.id === 1 && node.children.length >= 2) {
        setisNodeNumberExceed(true);
        return newData;
      }
      //limiting Appliances numbers
      if (selectedType.id === 2 && node.children.length >= 2) {
        setisNodeNumberExceed(true);
        return newData;
      }*/

      let label = inputName;
      let type;
      let frontEndId;
      let applianceCategory;

      if (selectedType.id === 1) {
        label = `${inputName} (${selectedType.label})`;
        type = `${selectedType.label}`;
        frontEndId = nodeData.frontEndId;
        node.children.push({
          frontEndId: frontEndId,
          name: label,
          nodeType: type,
          children: [],
        });
      } else if (selectedType.id === 2) {
        label = `${inputName} (${selectedApplianceType.label})`;
        type = `${selectedType.label}`;
        applianceCategory = `${selectedApplianceType.label}`;
        frontEndId = nodeData.frontEndId;
        node.children.push({
          frontEndId: frontEndId,
          name: label,
          nodeType: type,
          hours: `${hours}`,
          wattCapacity: `${wattCapacity}`,
          quantity: `${quantity}`,
          children: [],
        });
      }

      return newData;
    });
    setInputName("");
    setSelectedType(0);
    setSelectedApplianceType(0);
    setWattCapacity("");
    setHours("");
    setQuantity("");
  };
  //Node find function
  const findNode = (data, nodeId) => {
    if (data.frontEndId === nodeId) {
      return data;
    }
    for (let i = 0; i < data.children.length; i++) {
      let node = findNode(data.children[i], nodeId);

      if (node) {
        return node;
      }
    }
    return null;
  };
  //Node Delete Function
  const handleDelete = (nodeId) => {
    setData((prevData) => {
      let newData = { ...prevData };
      let parentNode = findParentNode(newData, nodeId);
      if (parentNode) {
        let nodeIndex = parentNode.children.findIndex(
          (node) => node.frontEndId === nodeId
        );
        if (nodeIndex !== -1) {
          parentNode.children.splice(nodeIndex, 1);
          return newData;
        }
      }
    });
  };
  //find Parent node
  const findParentNode = (data, nodeId) => {
    if (data.children) {
      for (let i = 0; i < data.children.length; i++) {
        if (data.children[i].frontEndId === nodeId) {
          return data;
        }
        let parentNode = findParentNode(data.children[i], nodeId);
        if (parentNode) {
          return parentNode;
        }
      }
    }
    return null;
  };

  const convertToJSON = (nodes) => {
    //convert to Jason for Appliance
    if (nodes.nodeType === "Appliance") {
      return {
        frontEndId: nodes.frontEndId,
        name: nodes.name,
        selectedType: nodes.nodeType,
        wattCapacity: nodes.wattCapacity,
        hours: nodes.hours,
        quantity: nodes.quantity,
        children: nodes.children?.map((node) => convertToJSON(node)),
      };
    } else {
      //convert to Jason for Sections
      return {
        frontEndId: nodes.frontEndId,
        name: nodes.name,
        selectedType: nodes.nodeType,
        children: nodes.children?.map((node) => convertToJSON(node)),
      };
    }
  };

  useEffect(() => {
    console.log(data);
    getData();
  });

  return (
    <React.Fragment>
      <Dashboard />
      <Container>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            columnGap: 3,
            width: "1250px",
            height: "80vh",
          }}
        >
          <Box
            sx={{
              width: "35%",
              boxShadow: 2,
              height: "100%",
              overflowY: "hidden",
            }}
          >
            <Paper elevation={3}>
              <Box p={3}>
                <TreeView
                  aria-label="rich object"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpanded={["root"]}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{
                    height: "100%",
                    flexGrow: 1,
                    maxWidth: 400,
                    overflowY: "hidden",
                  }}
                >
                  {renderTree(data)}
                </TreeView>
              </Box>
            </Paper>
          </Box>
          <Box
            sx={{
              width: "65%",
              boxShadow: 2,
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Paper elevation={3}>
              <Box p={3}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                />
                <Autocomplete
                  options={type}
                  getOptionLabel={(option) => option.label}
                  style={{ width: "100%", marginTop: 16 }}
                  id="disable-clearable"
                  disableClearable
                  onChange={(event, newValue) => {
                    setSelectedType(newValue);
                  }}
                  isOptionEqualToValue={isOptionEqualToValue}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />

                <Divider style={{ marginTop: 16, marginBottom: 16 }} />
                <Box
                  sx={{ mt: 3, display: "flex", columnGap: 3, width: "100%" }}
                >
                  <Autocomplete
                    options={applianceType}
                    getOptionLabel={(option) => option.label}
                    style={{ width: "100%" }}
                    disabled={selectedType.id !== 2}
                    onChange={(event, newValue) => {
                      setSelectedApplianceType(newValue);
                    }}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Appliance Type"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />

                  <TextField
                    label="Watt Capacity"
                    id="outlined-start-adornment"
                    fullWidth
                    value={wattCapacity}
                    disabled={selectedType.id !== 2}
                    onChange={(e) => setWattCapacity(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">W</InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box
                  sx={{ mt: 3, display: "flex", columnGap: 3, width: "100%" }}
                >
                  <TextField
                    label="Hours"
                    id="outlined-start-adornment"
                    fullWidth
                    value={hours}
                    disabled={selectedType.id !== 2}
                    onChange={(e) => setHours(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">H</InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    value={quantity}
                    disabled={selectedType.id !== 2}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    columnGap: 3,
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addNode}
                    disabled={isAppliance === true}
                    sx={{ width: "25%" }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={deleteNode}
                    sx={{ width: "25%" }}
                  >
                    Delete
                  </Button>
                </Box>
                {isNodeNumberExceed && (
                  <Box sx={{ mt: 5 }}>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert
                        severity="warning"
                        sx={{ fontSize: 16, backgroundColor: "#fff3e0" }}
                      >
                        <AlertTitle sx={{ fontSize: 20 }}>Warning</AlertTitle>
                        You Reached to your Maximum Section Numbers or
                        Aplliances number <strong> Upgrade Your Plan!</strong>
                      </Alert>
                    </Stack>
                  </Box>
                )}
              </Box>
            </Paper>
            <Paper>
              <ResultCalculation projectId={projectId} />
            </Paper>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(ProjectDetails);
