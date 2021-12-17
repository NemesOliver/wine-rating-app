import { useState, useContext } from "react";
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { SnackbarContext } from "../../context/SnackbarContext";
import withAuth from "../../components/withAuth";
import { Button, TextField } from "@mui/material";
import initializeFirebase from "../../firebase";
import { Router, useRouter } from "next/router";

const EditUser = () => {
  const router = useRouter();
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
      .then(() => router.push("/user/profile"))
      .catch((e) => {
        triggerSnackbar("error", "Oops! Something went wrong!");
        console.warn(e);
      });
  };

  return (
    <div>
      <TextField type="file" />
      <TextField
        type="text"
        value={displayName}
        label="Display Name"
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <Button onClick={onClickChangeDisplayName}>Submit</Button>
    </div>
  );
};

export default withAuth(EditUser);
