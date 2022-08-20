import { Box, Typography, MenuItem, Menu, styled } from "@mui/material";

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import React, { useState } from "react";

const Component = styled(Menu)`
  margin-top: 5px;
`;

const Logout=styled(Typography)`
    font-size:17px;
    margin-left:20px;
`

const Profile = ({ loginName,setLoginName }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const logoutUser=()=>{
    setLoginName('')
  }
  return (
    <>
      <Box onClick={handleClick}>
        <Typography style={{ marginTop: 3 }}>{loginName}</Typography>
      </Box>
      <Component anchorEl={open} open={Boolean(open)} onClose={handleClose}>
        <MenuItem onClick={()=>{handleClose(); logoutUser()}}><PowerSettingsNewIcon color='primary' fontSize="small"/>
        <Logout>Logout</Logout></MenuItem>
      </Component>
    </>
  );
};

export default Profile;
