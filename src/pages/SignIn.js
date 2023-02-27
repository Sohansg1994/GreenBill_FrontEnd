import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "./modules/withRoot";
import axios from "axios";
import { Stack, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState(null);
  const [refreshToken, setRefreshToken] = React.useState(null);
  const [firstName, setFirstName] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [warningMessage, setWarningMessage] = React.useState(null);
  const [accessTokenExpirationTime, setAccessTokenExpirationTime] =
    React.useState(null);
  let navigate = useNavigate();
  const validate = (values) => {
    const errors = required(["email", "password"], values);

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
      const response = await axios.post(
        "http://localhost:8080/user/login",
        values
      );

      console.log(response);
      if (response.status === 200) {
        console.log(response.status);
        console.log(response);
        //const { accessToken, refreshToken } = response.data;
        const accessToken = response.data.data[0].token;
        const refreshToken = response.data.data[0].refreshToken;
        const firstName = response.data.data[0].firstName;
        const expirationTime = response.data.data[0].atexTime;
        console.log(expirationTime);

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setFirstName(firstName);
        setAccessTokenExpirationTime(expirationTime);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("accessTokenExpiration", expirationTime);

        setSent(true);
        navigate("/projects");
      }
    } catch (error) {
      setWarningMessage(error.response.data.message);
      setWarning(true);
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/signup" align="center" underline="always">
              Sign Up here
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
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
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
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
              {warning && (
                <Stack spacing={2}>
                  <Alert severity="error">{warningMessage}</Alert>
                </Stack>
              )}
            </Box>
          )}
        </Form>
        <Typography align="center">
          {/*<Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            Forgot password?
              </Link>*/}
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
