import { useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/card/Card";
import { Container, Grid } from "@mui/material";
import FloatingAddButton from "../components/floatingActionButton/FloatingAddButton";
import RadioButtons from "../components/radioButtons/RadioButtons";

const Home: NextPage = () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <div>
      <Head>
        <title>Wine Cellar</title>
        <meta name="description" content="Create wine collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="sm">
        <br />
        <br />
        {/* position items in the center? - find out how*/}
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <RadioButtons />
          </Grid>
          <Grid item xs={12}>
            <Card />
          </Grid>
        </Grid>
      </Container>
      {isSignedIn && <FloatingAddButton />}
    </div>
  );
};

export default Home;
