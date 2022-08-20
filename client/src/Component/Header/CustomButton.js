import React, { useState, useContext } from "react";
import { Box, Button, Typography, styled, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginDialog from "../LoginDialog";
import { DataContext } from "../../Context/DataProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Wrapper = styled(Box)`
  margin: "0 3% 0 auto";
  display: flex;
  & > button,
  & > p,
  & > div {
    margin-right: 40px;
    font-size: 16px;
    align-items: center;
  }
`;
const Container = styled(Link)(({theme})=>({
  display: 'flex',
  [theme.breakpoints.down('md')]:{
    display:'block'
  }
}));

const LoginButton = styled(Button)`
  color: #2874f0;
  background: #ffffff;
  text-transform: none;
  padding: 5px 40px;
  border-radius: 2px;
  box-shadow: none;
  font-weight: 600;
  height: 32px;
`;

const CustomButton = () => {
  const {cartItems}=useSelector(state=>state.cart);

  const { loginName,setLoginName } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };
  return (
    <Wrapper sx={{display:{lg:'flex' , md:'flex' ,sm:'block' ,xs:'block'}}}>
      {loginName ? (
        <Profile loginName={loginName} setLoginName={setLoginName}/>
      ) : (
        <LoginButton variant="contained" onClick={() => openDialog()}>
          Login
        </LoginButton>
      )}
      <Typography style={{ marginTop: 3, width: 135 }}>
        Become a Seller
      </Typography>
      <Typography style={{ marginTop: 3 }}>More</Typography>
      <Container to='/cart' style={{textDecoration:'none',color:'inherit'}}>
        <Badge badgeContent={cartItems?.length} color="secondary">
        <ShoppingCartIcon />
        </Badge>
        <Typography style={{marginLeft:10}}>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default CustomButton;
