import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import Header from "./modules/views/Header";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "./modules/withRoot";
import { useNavigate } from "react-router-dom";
import { Alert, Stack } from "@mui/material";

import axios from "axios";

function SignUp() {
  const [sent, setSent] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState(null);
  const [refreshToken, setRefreshToken] = React.useState(null);
  const [firstName, setFirstName] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [accessTokenExpireTime, setAccessTokenExpireTime] =
    React.useState(null);
  let navigate = useNavigate();

  const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/user/register", values);
      console.log(response.status);
      console.log(response.data.data[0]);
      if (response.status === 200) {
        //const { accessToken, refreshToken } = response.data;
        const accessToken = response.data.data[0].accessToken;
        const refreshToken = response.data.data[0].refreshToken;
        const firstName = response.data.data[0].firstName;
        const role = response.data.data[0].role;
        const accessTokenET = response.data.data[0].accessTokenExpireTime;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setAccessTokenExpireTime(accessTokenET);
        setFirstName(firstName);
        setRole(role);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessTokenExpiration", accessTokenET);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("role", role);
        console.log(accessTokenExpireTime);
        console.log(accessToken);

        setSent(true);
        navigate("/subcription");
      }
    } catch (error) {
      setWarning(true);
      //console.error(error);
      // handle error
    }
  };

  return (
    <React.Fragment>
      <Header />
      <AppForm>
        <React.Fragment>
          <Typography
            variant="h3"
            align="center"
            sx={{ fontFamily: "Montserrat" }}
          >
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/signIn" underline="hover">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{
                  mt: 3,
                  mb: 2,
                  fontFamily: "Montserrat",
                  backgroundColor: "#1F8A70",
                }}
                disabled={submitting || sent}
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign Up"}
              </FormButton>
              {warning && (
                <Stack spacing={2}>
                  <Alert severity="warning">Email Already Registered</Alert>
                </Stack>
              )}
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignUp);
