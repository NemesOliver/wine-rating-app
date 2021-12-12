import { useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AuthContext } from "../context/AuthContext";

const Home: NextPage = () => {
  const { isSignedIn, user } = useContext(AuthContext);

  console.log(isSignedIn, user);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
