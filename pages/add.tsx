import { useState } from "react";
import withAuth from "../components/withAuth";
import {
  Container,
  MenuItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const selectOptions = [
  {
    value: "red",
    label: "Red",
  },
  {
    value: "white",
    label: "White",
  },
  {
    value: "rose",
    label: "Rose",
  },
];

const AddWine = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [selectValue, setSelectValue] = useState("red");

  // 1. write logic to create a doc in firebase
  // 2. if promise resolved push to /
  // 3. if promise unresolved trigger snackbar

  return (
    <main>
      <Container
        maxWidth="xs"
        sx={{
          height: "94vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography align="center" variant="h4">
          Add wine to colection.
        </Typography>
        <Typography
          margin={(theme) => theme.spacing(3)}
          align="center"
          variant="subtitle2"
        >
          All options are required. You can change all options after submiting.
        </Typography>
        <TextField
          fullWidth
          required
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          type="number"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          label="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          label="Type"
          select
          helperText="Please select a type"
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
          margin="normal"
        >
          {selectOptions.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          sx={{ marginTop: "2rem" }}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
        >
          Submit
        </Button>
      </Container>
    </main>
  );
};

export default withAuth(AddWine);
