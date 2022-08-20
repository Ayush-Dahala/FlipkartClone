import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";
import { navData } from "../../constants/data";

const Component = {
  display: "flex",
  margin: { lg: "55px 130px 0 130px", md: 0 },
  overflow:'hidden',
  justifyContent: "space-between",
  backgroundColor:"#FFF"
};

const Container = styled(Box)`
  padding: 12px 8px;
  text-align: center;
`;

const Text = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
`;

const Navbar = () => {
  return (
    <Box sx={Component} style={{background:'#fff'}}>
      {navData.map((data) => (
        <Container key={data.id}>
          <img key={data.id} src={data.url} alt="" style={{ width: 64 }}></img>
          <Text key={data.id}>{data.text}</Text>
        </Container>
      ))}
    </Box>
  );
};

export default Navbar;
