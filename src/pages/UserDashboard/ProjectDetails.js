import {Container} from "@mui/system";
import React, {useEffect, useState} from "react";
import Dashboard from "./components/Dashboard";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useLocation} from "react-router-dom";
import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import withRoot from "../modules/withRoot";

function ProjectDetails() {
    const location = useLocation();
    const projectName = new URLSearchParams(location.search).get('projectName');

    const [inputName, setInputName] = useState("");
    const [selectedType, setSelectedType] = useState(0);

    const [selectedApplianceType, setSelectedApplianceType] = useState(0);
    const [wattCapacity, setWattCapacity] = useState("");
    const [elementNumber, setElementNumber] = useState("");
    const [data, setData] = useState({
        id: "root",
        name: projectName,
        children: [],
    });
    const [selectedNode, setSelectedNode] = useState("root");

    const type = [{label: 'Section', id: 1}, {label: 'Appliance', id: 2},];

    const applianceType = [{label: 'Fan', id: 1}, {label: 'Light', id: 2}, {label: 'Kitchen Appliance', id: 3},];

    const handleNodeSelect = (event, nodeId) => {
        setSelectedNode(nodeId);
    };

    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={
                nodes.selectedType === 2
                    ? `${nodes.name} - Watt Capacity: ${nodes.wattCapacity} - Element Number: ${nodes.elementNumber}`
                    : nodes.name
            }
            onClick={(event) => handleNodeSelect(event, nodes.id)}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );


    const handleAdd = () => {
        setData((prevData) => {
            let newData = {...prevData};
            let node = findNode(newData, selectedNode);
            if (!node.children) {
                node.children = [];
            }
            let label = inputName;
            if (selectedType.id === 1) {
                label = `${inputName} (${selectedType.label})`;
                node.children.push({id: inputName, name: label, children: []});
            } else if (selectedType.id === 2) {
                label = `${inputName} (${selectedApplianceType.label})`;
                node.children.push({
                    id: inputName,
                    name: label,
                    children: [
                        {id: 'wattCapacity', name: `Watt Capacity: ${wattCapacity}`},
                        {id: 'elementNumber', name: `Element Number: ${elementNumber}`},
                    ],
                });
            }
            return newData;
        });
        setInputName("");
        setSelectedType(0);
        setSelectedApplianceType(0);
        setWattCapacity("");
        setElementNumber("");
    };

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

    useEffect(() => {
        console.log(selectedType.id);
    });

    const handleDelete = () => {
        setData((prevData) => {
            let newData = {...prevData};
            let parentNode = findParentNode(newData, selectedNode);
            if (parentNode) {
                let nodeIndex = parentNode.children.findIndex((node) => node.id === selectedNode);
                if (nodeIndex !== -1) {
                    parentNode.children.splice(nodeIndex, 1);
                    return newData;
                }
            }
        });
    };

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

  console.log(convertToJSON(data));

    return (
        <React.Fragment>
            <Dashboard/>
            <Container>
                <Box sx={{mt: 5, display: "flex", columnGap: 3, width: "100%", height: "80vh",}}>
                    <Box sx={{width: "35%", boxShadow: 2, height: "100%", overflowY: "hidden"}}>
                        <Paper elevation={3}>
                            <Box p={3}>
                                <TreeView
                                    aria-label="rich object"
                                    defaultCollapseIcon={<ExpandMoreIcon/>}
                                    defaultExpanded={["root"]}
                                    defaultExpandIcon={<ChevronRightIcon/>}
                                    sx={{height: "100%", flexGrow: 1, maxWidth: 400, overflowY: "hidden"}}
                                >
                                    {renderTree(data)}
                                </TreeView>
                            </Box>
                        </Paper>
                    </Box>
                    <Box sx={{width: "65%", boxShadow: 2, height: "100%", overflowY: "auto",}}>
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
                                    style={{width: '100%', marginTop: 16}}
                                    id="disable-clearable"
                                    disableClearable
                                    onChange={(event, newValue) => {
                                        setSelectedType(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Type"
                                            variant="outlined"
                                            fullWidth

                                        />
                                    )}
                                />


                                <Divider style={{marginTop: 16, marginBottom: 16}}/>

                                <Autocomplete
                                    options={applianceType}
                                    getOptionLabel={(option) => option.label}
                                    style={{width: '100%', marginTop: 16}}
                                    disabled={selectedType.id !== 2}
                                    onChange={(event, newValue) => {
                                        setSelectedApplianceType(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Appliance Type"
                                            variant="outlined"
                                            fullWidth

                                        />
                                    )}
                                />
                                <Box sx={{mt: 3, display: "flex", columnGap: 3, width: "100%"}}>

                                    <TextField
                                        label="Watt Capacity"
                                        id="outlined-start-adornment"
                                        fullWidth
                                        value={wattCapacity}
                                        disabled={selectedType.id !== 2}
                                        onChange={(e) => setWattCapacity(e.target.value)}

                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">W</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        label="Number of Elements"
                                        variant="outlined"
                                        fullWidth
                                        value={elementNumber}
                                        disabled={selectedType.id !== 2}
                                        onChange={(e) => setElementNumber(e.target.value)}
                                    />

                                </Box>

                                <Box sx={{
                                    mt: 3,
                                    display: "flex",
                                    columnGap: 3,
                                    width: "100%",
                                    justifyContent: 'space-evenly'
                                }}>
                                    <Button variant="contained" color="primary" onClick={handleAdd} sx={{width: '25%'}}>
                                        Add
                                    </Button>
                                    <Button variant="contained" color="error" onClick={handleDelete}
                                            sx={{width: '25%'}}>
                                        Delete
                                    </Button>
                                </Box>

                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default withRoot(ProjectDetails);

