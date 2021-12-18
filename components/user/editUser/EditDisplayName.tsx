import { useState, useContext, SetStateAction } from "react";
import { useRouter } from "next/router";
import initializeFirebase from "../../../firebase";
import { doc, setDoc, getFirestore, collection } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { SnackbarContext } from "../../../context/SnackbarContext";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

interface EditDisplayNameProps {
  displayNameModalOpen: boolean;
  setDisplayNameModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const EditDisplayName = ({
  displayNameModalOpen,
  setDisplayNameModalOpen,
}: EditDisplayNameProps) => {
  const [displayName, setDisplayName] = useState("");
  const { userDocId } = useContext(AuthContext);
  const { triggerSnackbar } = useContext(SnackbarContext);

  const onClickChangeDisplayName = () => {
    initializeFirebase();
    const db = getFirestore();
    const userColRef = collection(db, "users");

    // Update user info
    setDoc(doc(userColRef, userDocId), { displayName }, { merge: true })
      .then(() => {
        triggerSnackbar("success", "Your profile was successfuly updated.");
      })
      .then(() => setDisplayNameModalOpen(false))
      .catch((e) => {
        triggerSnackbar("error", "Oops! Something went wrong!");
        console.warn(e);
      });
  };
  return (
    <>
      <Dialog
        open={displayNameModalOpen}
        onClose={() => setDisplayNameModalOpen(false)}
      >
        <DialogTitle>Update display name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a display name that shows next to your avatar.
          </DialogContentText>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            value={displayName}
            label="Display Name"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDisplayNameModalOpen(false)}>Cancel</Button>
          <Button onClick={onClickChangeDisplayName}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDisplayName;
