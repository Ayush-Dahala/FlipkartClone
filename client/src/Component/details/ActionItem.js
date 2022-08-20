import { Box, Button, styled } from "@mui/material";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/action/CartAction";
import { payUsingPaytm } from "../../service/Api";
import { post } from "../../utils/Paytm";

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down("lg")]: {
    padding: "20px 40px",
  },
}));
const Image = styled("img")({
  width: "95%",
  padding: "15px",
});

const StyledButton = styled(Button)(({ theme }) => ({
  width: "46%",
  height: 50,
  borderRadius: 2,
  [theme.breakpoints.down("lg")]: {
    width: "46%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "48%",
  },
}));

const ActionItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { id } = product;

  const openCart = () => {
    dispatch(addToCart(id, quantity));
    navigate("/cart");
  };

  const buyNow=async()=>{
    let response=await payUsingPaytm({amount:500,email:'ayushdahala4@gmail.com'})
    let information={
      action:"https://securegw-stage.paytm.in/order/process",
      params:response
    }
    post(information);

  }

  return (
    <LeftContainer>
      <Box
        style={{
          padding: "15px 20px",
          border: "1px solid #f0f0f0",
          width: "90%",
        }}
      >
        <Image src={product.detailUrl}></Image>
      </Box>
      <StyledButton
        style={{ marginRight: 10, backgroundColor: "#ff9f00" }}
        variant="contained"
        onClick={openCart}
      >
        <ShoppingCartIcon />
        Add to Cart
      </StyledButton>
      <StyledButton style={{ backgroundColor: "#fb541b" }} variant="contained" onClick={()=>buyNow()}>
        <FlashOnIcon />
        Buy Now
      </StyledButton>
    </LeftContainer>
  );
};

export default ActionItem;
