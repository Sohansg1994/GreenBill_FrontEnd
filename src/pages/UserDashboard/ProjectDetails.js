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
function ProjectDetails() {
  //get project name from Project page
  const location = useLocation();
  const projectName = new URLSearchParams(location.search).get("projectName");
  const projectId = new URLSearchParams(location.search).get("projectId");

  const [inputName, setInputName] = useState("");

  const [selectedType, setSelectedType] = useState(0);

  const [selectedApplianceType, setSelectedApplianceType] = useState(0);

  const [wattCapacity, setWattCapacity] = useState("");

  const [quantity, setQuantity] = useState("");

  const [hours, setHours] = useState("");

  const [isNodeNumberExceed, setisNodeNumberExceed] = useState(false);

  const [data, setData] = useState({
    id: "root",
    name: projectName,
    projectId: projectId,
    category: "Main",
    children: [],
  });

  const [selectedNode, setSelectedNode] = useState("root");

  const [counter, setCounter] = useState(0);

  //Appliance or not

  const [isAppliance, setIsAppliance] = useState(false);

  const [nodeSectionData, setNodeSectionData] = useState("");

  const [isNodeUpdated, setIsNodeUpdated] = useState(false);

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

  //to save data in dataBase
  const saveTreeData = async () => {
    try {
      const response = await axios.post("/api/treeview", data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getTreeData = async () => {
    try {
      const response = await axios.get("/api/get-tree-data");
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  //to generate custom node id
  const generateNodeId = () => {
    setCounter((prevCounter) => prevCounter + 1);
    return `node-${Date.now()}-${counter}`;
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
      key={nodes.id}
      nodeId={nodes.id}
      nodetype={nodes.category}
      label={
        nodes.selectedType === 2
          ? `${nodes.name} - Watt Capacity: ${nodes.wattCapacity} - Hours: ${nodes.hours} - Quantity: ${nodes.quantity} `
          : nodes.name
      }
      onClick={(event) => handleNodeSelect(event, nodes.id, nodes.category)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  // Node adding function
  const handleAdd = (event) => {
    event.preventDefault();
    setData((prevData) => {
      let newData = { ...prevData };
      let node = findNode(newData, selectedNode);

      if (!node.children) {
        node.children = [];
      }
      //limiting section numbers
      if (selectedType.id === 1 && node.children.length >= 2) {
        setisNodeNumberExceed(true);
        return newData;
      }
      //limiting Appliances numbers
      if (selectedType.id === 2 && node.children.length >= 2) {
        setisNodeNumberExceed(true);
        return newData;
      }

      let label = inputName;
      let type;
      let parentNodeId;
      let applianceCategory;

      if (selectedType.id === 1) {
        label = `${inputName} (${selectedType.label})`;
        type = `${selectedType.label}`;

        node.children.push({
          id: generateNodeId(),
          name: label,

          category: type,
          children: [],
        });

        setNodeSectionData({
          parentNodeId: selectedNode,
          projectId: "null",
          nodeId: node.children[node.children.length - 1].id,
          name: inputName,
        });
      } else if (selectedType.id === 2) {
        label = `${inputName} (${selectedApplianceType.label})`;
        type = `${selectedType.label}`;
        applianceCategory = `${selectedApplianceType.label}`;
        node.children.push({
          id: generateNodeId(),
          name: label,
          category: type,
          hours: `${hours}`,
          wattCapacity: `${wattCapacity}`,
          quantity: `${quantity}`,
          children: [
            { id: "wattCapacity", name: `Watt Capacity: ${wattCapacity}` },
            { id: "hours", name: `Hours: ${hours}` },
            { id: "quantity", name: `Quantity: ${quantity}` },
          ],
        });

        setNodeSectionData({
          parentNodeId: selectedNode,
          applianceType: applianceCategory,
          projectId: "null",
          nodeId: node.children[node.children.length - 1].id,
          name: inputName,
          category: node.children[node.children.length - 1].category,
          wattCapacity: node.children[node.children.length - 1].wattCapacity,
          quantity: node.children[node.children.length - 1].quantity,
        });
      }
      setIsNodeUpdated(true);
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
    if (data.id === nodeId) {
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
  const handleDelete = () => {
    setData((prevData) => {
      let newData = { ...prevData };
      let parentNode = findParentNode(newData, selectedNode);
      if (parentNode) {
        let nodeIndex = parentNode.children.findIndex(
          (node) => node.id === selectedNode
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
        if (data.children[i].id === nodeId) {
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
    if (nodes.category === "Appliance") {
      return {
        id: nodes.id,
        name: nodes.name,
        selectedType: nodes.category,
        wattCapacity: nodes.wattCapacity,
        hours: nodes.hours,
        quantity: nodes.quantity,
        children: nodes.children?.map((node) => convertToJSON(node)),
      };
    } else {
      //convert to Jason for Sections
      return {
        id: nodes.id,
        name: nodes.name,
        selectedType: nodes.category,
        children: nodes.children?.map((node) => convertToJSON(node)),
      };
    }
  };

  useEffect(() => {
    if (isNodeUpdated) {
      console.log(nodeSectionData);
      console.log(convertToJSON(data));
      setIsNodeUpdated(false);
    }
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
            width: "100%",
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
                    onClick={handleAdd}
                    disabled={isAppliance === true}
                    sx={{ width: "25%" }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
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
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(ProjectDetails);
