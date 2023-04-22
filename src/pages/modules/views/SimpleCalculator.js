import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Paper from '@mui/material/Paper';
import Snackbar from "../components/Snackbar";


function SimpleCalculator() {
  const [units, setUnits] = useState(0);
  
  const isValid = units > 0;
  
  const monthlyFixedCharge = 700.00;
  const chargeForConsumption = units * 12.00;
  const totalCharge = monthlyFixedCharge + chargeForConsumption;
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setUnits(event.target.value);
  };
  
  return (
    <Container component="section" sx={{mt: 10, display: 'flex'}}>
      <Grid container sx={{bgcolor: 'warning.main',}}>
        <Grid item xs={10} md={5} sx={{zIndex: 1}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 8,
              px: 3,
            }}
          >
            <Box sx={{maxWidth: 400, fontFamily: 'Montserrat'}}>
              <Typography variant="h4" gutterBottom sx={{fontFamily: 'Montserrat'}}>
                Calculate Now
              </Typography>
              <Typography>
                Please enter the number of electricity units you have consumed, to calculate the price.
              </Typography>
              <TextField
                onChange={handleSubmit}
                noBorder
                placeholder="No of units"
                variant="standard"
                sx={{width: '100%', mt: 3, mb: 2}}
              />
            </Box>
          </Box>
        </Grid>
        {isValid ? (
          <Grid item xs={14} md={7} sx={{zIndex: 1}}>
            <Box
              sx={{
                justifyContent: 'center',
                py: 8,
                px: 4
              }}
            >
              <Box component="div">
                <Grid container spacing={2}>
                  <Grid item xs={5} sx={{px: 1, py: 1, textAlign: 'right'}}>
                    <Typography align="right">
                      Consumed units
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sx={{px: 0, py: 0, textAlign: 'left'}}>
                    <Paper variant="outlined" sx={{width: '80%', height: '100%', mx: 0, my: 0, px: 1, py: 1}}>
                      <Typography align="left" sx={{backgroundColor: '#fff'}}>
                        {units}
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={5} sx={{px: 1, py: 1, textAlign: 'right'}}>
                    <Typography align="right">
                      Monthly fixed charge
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sx={{px: 0, py: 0, textAlign: 'left'}}>
                    <Paper variant="outlined" sx={{width: '80%', height: '100%', mx: 0, my: 0, px: 1, py: 1}}>
                      <Typography align="left" sx={{backgroundColor: '#fff'}}>
                        {monthlyFixedCharge}
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={5} sx={{px: 1, py: 1, textAlign: 'right'}}>
                    <Typography align="right">
                      Charge for consumption
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sx={{px: 0, py: 0, textAlign: 'left'}}>
                    <Paper variant="outlined" sx={{width: '80%', height: '100%', mx: 0, my: 0, px: 1, py: 1}}>
                      <Typography align="left" sx={{backgroundColor: '#fff'}}>
                        {chargeForConsumption}
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={5} sx={{px: 1, py: 1, textAlign: 'right'}}>
                    <Typography align="right">
                      Total charge
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sx={{px: 0, py: 0, textAlign: 'left'}}>
                    <Paper variant="outlined" sx={{width: '80%', height: '100%', mx: 0, my: 0, px: 1, py: 1}}>
                      <Typography align="left" sx={{backgroundColor: '#fff'}}>
                        {totalCharge}
                      </Typography>
                    </Paper>
                  </Grid>
                
                </Grid>
              </Box>
            </Box>
          </Grid>
        ) : (
          <Snackbar
            // open={open}
            closeFunc={() => setUnits(0)}
            message="We will send you our best offers, once a week."
          />
        )}
      </Grid>
    </Container>
  );
}

export default SimpleCalculator;
