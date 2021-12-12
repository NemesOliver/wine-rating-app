import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Container, TextField, Button, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error handling needs to be done
  const onClickCreateUser = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        router.push("/");
      })
      .catch((e) => console.log(e));
    // notify user of error
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
          <Button
            onClick={onClickCreateUser}
            variant="contained"
            fullWidth
            size="large"
          >
            Sign in
          </Button>
        </form>
        <Typography
          margin={(theme) => theme.spacing(3)}
          align="center"
          variant="subtitle2"
        >
          Don&apos;t have an account? <br />
          <Link href="/register">Register</Link> your account free today!
        </Typography>
      </Container>
    </section>
  );
};

export default Login;
