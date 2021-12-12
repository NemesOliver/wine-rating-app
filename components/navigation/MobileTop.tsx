import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton, Button } from "@mui/material";
import { MobileTopNavigation } from "./MobileTop.styled";

const MobileTop = () => {
  return (
    <MobileTopNavigation>
      <IconButton edge="start">
        <ArrowBackIosNewIcon />
      </IconButton>
      <Button color="primary">Log in</Button>
    </MobileTopNavigation>
  );
};

export default MobileTop;
