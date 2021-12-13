import { useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";

const Home: NextPage = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const { triggerSnackbar } = useContext(SnackbarContext);

  console.log(isSignedIn, currentUser);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      1. change log in to loading button
      <br />
      2. add snackbars
      <button onClick={() => triggerSnackbar("error", "This is test message")}>
        snack me
      </button>
    </div>
  );
};

export default Home;
