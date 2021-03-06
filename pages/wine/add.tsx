import { useState, useContext } from "react";
import { useRouter } from "next/router";
import initializeFirebase from "../../firebase";
import { SnackbarContext } from "../../context/SnackbarContext";
import { AuthContext } from "../../context/AuthContext";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import withAuth from "../../components/withAuth";
import { LoadingButton } from "@mui/lab";
import { Container, MenuItem, TextField, Typography } from "@mui/material";

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

// Default wine image
const photoUrl =
  "https://firebasestorage.googleapis.com/v0/b/fir-test-97ab8.appspot.com/o/wine_placeholder.jpg?alt=media&token=3f4acd10-875f-46f9-b1ab-d2b66cc3f152";

const AddWine = () => {
  const Router = useRouter();
  const { triggerSnackbar } = useContext(SnackbarContext);
  const { currentUserId } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [selectValue, setSelectValue] = useState("red");

  const addWineToFirestore = () => {
    // Get collection
    initializeFirebase();
    const db = getFirestore();
    const winesColRef = collection(db, "wines");

    // Loading Button state and validation
    setLoading(true);
    setError(false);

    // Check for empty inputs
    if (name === "" || price === "" || region === "") {
      setError(true);
      triggerSnackbar("error", "All fields are required.");
      setLoading(false);
    } else {
      addDoc(winesColRef, {
        name,
        price,
        region,
        rating: [],
        type: selectValue,
        photoUrl,
        addedBy: currentUserId,
      })
        .then(() => {
          setLoading(false);
          Router.push("/");
          triggerSnackbar(
            "success",
            "Your wine has been successfuly added to collection."
          );
        })
        .catch((e) => {
          setLoading(false);
          console.warn(e);
          triggerSnackbar(e.code.split(5));
        });
    }
  };

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
          Add wine to collection.
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
          error={error}
        />
        <TextField
          fullWidth
          required
          type="number"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
          error={error}
        />
        <TextField
          fullWidth
          required
          label="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          margin="normal"
          error={error}
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
        <LoadingButton
          sx={{ marginTop: "2rem" }}
          fullWidth
          loading={loading}
          variant="contained"
          color="primary"
          size="large"
          onClick={addWineToFirestore}
        >
          Submit
        </LoadingButton>
      </Container>
    </main>
  );
};

export default withAuth(AddWine);
