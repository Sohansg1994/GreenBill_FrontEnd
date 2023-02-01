import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppFormSub from './modules/views/AppFormSub';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import axios from 'axios';



import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';


import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';


import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { DisabledByDefault } from '@mui/icons-material';

function Subcription() {
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['firstName', 'lastName', 'email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
        console.log('email error')
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
    const response = await axios.post('API_URL', values);
    if (response.status === 200) {
    // handle success
    setSent(true);
    } else {
    // handle error
    }
    } catch (error) {
    console.error(error);
    // handle error
    }
    };

    const tiers = [
      {
        title: 'Free',
        price: '0',
        description: [
          'Sentence 1',
          'Sentence 2',
          'Sentence 4',
          'Sentence 5',
        
        ],
        buttonText: 'Get started',
        buttonVariant: 'outlined',
     
        path:'/calculations'
     
      },
      {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
          'Sentence 1',
          'Sentence 2',
          'Sentence 4',
          'Sentence 5',
         
        ],
        buttonText: 'Get started',
       // buttonVariant: 'contained',
       buttonVariant: 'disabled',
      
        path:'/subcription'
      },
      {
        title: 'Enterprise',
        price: '30',
        description: [
          'Sentence 1',
          'Sentence 2',
          'Sentence 4',
          'Sentence 5',
        ],
        buttonText: 'Get started',
        //buttonVariant: 'outlined',
        buttonVariant: 'disabled',
     
        path:'/subcription'
      },
    ];
    



    
  return (
    <React.Fragment>
      <AppAppBar />
      <AppFormSub>
      <Container maxWidth="md" component="main">
        <Grid container spacing={3} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} varient={tier.buttonStatus} href={tier.path}>
                    {tier.buttonText} 
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </AppFormSub>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Subcription);
