import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import withRoot from 'D:/Proffession/ReactJs/GreenBill_FrontEnd/src/pages/modules/withRoot.js';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { TreeItem ,TreeView} from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';


function ProjectDetails() {
    const location = useLocation();
    const projectName = new URLSearchParams(location.search).get('projectName');

    const type = [
        { label: 'Section', id: 1 },
        { label: 'Room', id: 2 },
        { label: 'Appliances', id: 3 },
        ];
    const applianceType = [
        { label: 'Fan', id: 5 },
        { label: 'Light', id: 6 },
        { label: 'Kitchen Appliance', id: 7 },
        ];

         const [inputName, setInputName] = useState('');
         const [selectedType, setSelectedType] = useState(0);
        
         const [selectedApplianceType, setSelectedApplianceType] = useState(null);
         const [treeData, setTreeData] = useState([
            {
              label: projectName,
              children: [],
            }
          ]);

  const handleAdd = () => {
    if (selectedType) {
      // Add a new section or room
      setTreeData([
        ...treeData,
        {
          label: `${inputName} (${selectedType.label})`,
          children: [],
        },
      ]);
    } else if (selectedApplianceType) {
      // Add a new appliance
      setTreeData([
        ...treeData,
        {
          label: `${inputName} (${selectedApplianceType.label})`,
        },
      ]);
    }
  };

  useEffect(() => {   
     console.log(inputName)
     console.log(selectedType)
     console.log(projectName)
     });



  return (
    <React.Fragment>
        <Dashboard/>
        <Container >
            <Box sx={{mt:5 , display:'flex',columnGap:3 ,width:'100%',height:'80vh' }}   >
                <Box  sx={{ width: "35%" ,boxShadow: 2,height:'100% '}}>
                    <Paper  elevation={3}>
                        <Box sx={{ p: 3 }}>
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
                                style={{ width: '100%', marginTop: 16 }}
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
                            <Divider style={{ marginTop: 16, marginBottom: 16 }} />
                           
                            <Autocomplete
                                options={applianceType}
                                getOptionLabel={(option) => option.label}
                                style={{ width: '100%', marginTop: 16 }}
                                disabled={selectedType.id !== 3 || null}
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
                            <Box sx={{display: 'flex',justifyContent: 'flex-end',mt: 2}}>
                                <Button variant="contained" color="primary" onClick={handleAdd}>
                                    Add
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{ width: "65%" ,boxShadow: 2, height:'100%', overflowY:'auto'}} >
                    <Paper elevation={3} >
                        <Box p={3}>
                            <TreeView
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                            >
                                {treeData.map((node, index) => (
                                    <TreeItem nodeId={index} label={node.label} key={index}>
                                        {node.children.map((child, childIndex) => (
                                            <TreeItem nodeId={`${index}-${childIndex}`} label={child.label} key={childIndex} />
                                            ))}
                                            </TreeItem>
                                            ))}
                            </TreeView>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    </React.Fragment>
  )
}

export default withRoot(ProjectDetails);
