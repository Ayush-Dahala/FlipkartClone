import React, { useState, useContext } from "react";
import { DataContext } from "../Context/DataProvider";
import {
  Box,
  Button,
  Dialog,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { authenticationLogin, authenticationSignUp } from "../service/Api";

const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
  display: flex;
`;

const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  height: 83%;
  width: 40%;
  padding: 45px 35px;

  & > p,
  & > h5 {
    color: white;
    font-weight: 600;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  margin-top: 20px;
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const RequestButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const CreateAccount = styled(Typography)`
  font-size: 14px;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  cursor: pointer;
`;

const Error=styled(Typography)`
  font-size:10px;
  color:#ff6161;
  line-height:0;
  font-weight:600;
  margin-top:-10px;
  margin-bottom:12px;
`

const LoginDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
    setAccount(accountInitialValues.login);
    setError(false);
  };

  const signupInitialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phone: "",
  };

  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState(false);

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(signup);
  };

  const accountInitialValues = {
    login: {
      view: "login",
      heading: "Login",
      subHeading: "Get access to your Orders, Wishlist and Recommendations",
    },
    signin: {
      view: "signin",
      heading: "Looks like you're new here!",
      subHeading: "Sign up with your mobile number to get started",
    },
  };

  const loginInitialValues = {
    userName: "",
    password: "",
  };

  const [account, setAccount] = useState(accountInitialValues.login);

  const [login, setLogin] = useState(loginInitialValues);

  const toggleSignup = () => {
    setAccount(accountInitialValues.signin);
  };

  const toggleLogin = () => {
    setAccount(accountInitialValues.login);
  };

  const { setLoginName } = useContext(DataContext);

  const signupUser = async () => {
    let response = await authenticationSignUp(signup);
    if (!response) {
      return;
    } else {
      handleClose();
      setLoginName(signup.firstName);
    }
  };

  const onValueChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const loginUser = async () => {
    let response = await authenticationLogin(login);
    console.log(response);
    if (response) {
      handleClose();
      setLoginName(response.data.firstName);
    } else {
      setError(true)
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { maxWidth: "unset" } }}
      >
        <Component>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.subHeading}
            </Typography>
          </Image>
          {account.view === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onValueChange(e)}
                name="userName"
                label="Enter Username"
              />
              {error && (
                <Error>
                  Please enter valid username or password{" "}
                </Error>
              )}
              <TextField
                variant="standard"
                onChange={(e) => onValueChange(e)}
                name="password"
                label="Enter Password"
              />
              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Text>
              <LoginButton onClick={() => loginUser()}>Login</LoginButton>
              <Typography style={{ textAlign: "center", color: "#878787" }}>
                OR
              </Typography>
              <RequestButton>Request OTP</RequestButton>
              <CreateAccount onClick={() => toggleSignup()}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="firstName"
                label="Enter Firstname"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="lastName"
                label="Enter Lastname"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="userName"
                label="Enter Username"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="email"
                label="Enter Email"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Enter Password"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="phone"
                label="Enter Phone"
              />
              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Text>
              <LoginButton onClick={() => signupUser()}>CONTINUE</LoginButton>
              <RequestButton onClick={() => toggleLogin()}>
                Existing User? Log in
              </RequestButton>
            </Wrapper>
          )}
        </Component>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
