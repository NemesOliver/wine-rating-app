import { Typography } from "@mui/material";
import { useState } from "react";
import RadioBtn from "./RadioBtn.styled";

const RadioButtons = () => {
  return (
    <RadioBtn>
      <div>
        <input type="radio" value="all" id="all" name="wine" defaultChecked />
        <label htmlFor="all">
          <Typography fontWeight="bold" variant="button">
            all
          </Typography>
        </label>
      </div>
      <div>
        <input type="radio" id="red" value="red" name="wine" />
        <label htmlFor="red">
          <Typography fontWeight="bold" variant="button">
            RED
          </Typography>
        </label>
      </div>
      <div>
        <input type="radio" id="white" value="white" name="wine" />
        <label htmlFor="white">
          <Typography fontWeight="bold" variant="button">
            white
          </Typography>
        </label>
      </div>
    </RadioBtn>
  );
};

export default RadioButtons;
