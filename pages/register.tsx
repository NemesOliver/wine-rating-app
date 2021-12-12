import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Container, TextField, Button, Typography } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickCreateUser = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // create user in user collection
        router.push("/");
      })
      // notify user of error
      .catch((e) => console.log(e));
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
          Already have an account? <br />
          <Link href="/login">Log In</Link> to your account.
        </Typography>
      </Container>
    </section>
  );
};

export default Register;
