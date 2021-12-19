import { Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import RadioBtn from "./RadioBtn.styled";

interface RadioButtonsProps {
  setFilteredValue: React.Dispatch<SetStateAction<string>>;
}

const RadioButtons = ({ setFilteredValue }: RadioButtonsProps) => {
  return (
    <RadioBtn>
      <div>
        <input
          onChange={(e) => setFilteredValue(e.target.value)}
          type="radio"
          value="all"
          id="all"
          name="wine"
          defaultChecked
        />
        <label htmlFor="all">
          <Typography fontWeight="bold" variant="button">
            all
          </Typography>
        </label>
      </div>
      <div>
        <input
          onChange={(e) => setFilteredValue(e.target.value)}
          type="radio"
          id="red"
          value="red"
          name="wine"
        />
        <label htmlFor="red">
          <Typography fontWeight="bold" variant="button">
            RED
          </Typography>
        </label>
      </div>
      <div>
        <input
          onChange={(e) => setFilteredValue(e.target.value)}
          type="radio"
          id="white"
          value="white"
          name="wine"
        />
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
