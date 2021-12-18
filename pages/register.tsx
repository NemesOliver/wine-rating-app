import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SnackbarContext } from "../context/SnackbarContext";
import { Container, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { triggerSnackbar } = useContext(SnackbarContext);

  const onClickCreateUser = () => {
    const auth = getAuth();
    const db = getFirestore();
    const userColRef = collection(db, "users");

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // create user in user collection - firebase
        const uid = user.user.uid;
        const email = user.user.email;

        setDoc(doc(userColRef), {
          uid,
          email,
          photoUrl: "",
          favorites: [],
          wines: [],
        })
          .then(() => {
            // notify user of success
            setLoading(false);
            triggerSnackbar("success", "Your account was succesfully created!");
            router.push("/");
          })
          .catch((e) => {
            console.warn(e);
          });
      })
      .catch((e) => {
        setLoading(false);
        // notify user of error
        triggerSnackbar("error", e.code.slice(5));
        console.warn(e);
      });
  };

  return (
    <section>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "94vh",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          margin={(theme) => theme.spacing(5)}
        >
          Create your free account now!
        </Typography>
        <form>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            color="primary"
            fullWidth
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            variant="outlined"
            color="primary"
            autoComplete="true"
            fullWidth
            sx={{ margin: "2rem 0 2rem 0" }}
          />
          <LoadingButton
            onClick={onClickCreateUser}
            variant="contained"
            fullWidth
            size="large"
            loading={loading}
          >
            Sign in
          </LoadingButton>
        </form>
        <Typography
          margin={(theme) => theme.spacing(3)}
          align="center"
          variant="subtitle2"
        >
          Already have an account? <br />
          <Link href="/login">Log In</Link> to your account.
        </Typography>
      </Container>
    </section>
  );
};

export default Register;
