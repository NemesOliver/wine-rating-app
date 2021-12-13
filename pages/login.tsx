import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SnackbarContext } from "../context/SnackbarContext";
import { Container, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { triggerSnackbar } = useContext(SnackbarContext);

  // error handling needs to be done
  const onClickCreateUser = () => {
    const auth = getAuth();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setLoading(false);
        router.push("/");
      })
      .catch((e) => {
        setLoading(false);
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
          Please log in to your account.
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
          Don&apos;t have an account? <br />
          <Link href="/register">Register</Link> your free account today!
        </Typography>
      </Container>
    </section>
  );
};

export default Login;
