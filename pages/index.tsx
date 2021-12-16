import { useContext, ReactNode } from "react";
import type {
  GetServerSideProps,
  GetStaticProps,
  NextPage,
  NextPageContext,
} from "next";
import Head from "next/head";
import { AuthContext } from "../context/AuthContext";
import initializeFirebase from "../firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Card from "../components/card/Card";
import { Container, Grid } from "@mui/material";
import FloatingAddButton from "../components/floatingActionButton/FloatingAddButton";
import RadioButtons from "../components/radioButtons/RadioButtons";

interface PageProps {
  wines: [];
}

interface Wine {
  name: string;
  price: string;
  rating: number[];
  region: string;
  type: string;
  id: string;
  photoUrl: string;
}

const Home: NextPage<PageProps> = ({ wines }) => {
  const { isSignedIn } = useContext(AuthContext);

  console.log(wines);

  return (
    <div>
      <Head>
        <title>Wine Cellar</title>
        <meta name="description" content="Create wine collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br />
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <RadioButtons />
      </div>
      <Container maxWidth="sm">
        <br />
        <br />
        {/* position items in the center? - find out how */}
        <Grid container spacing={5}>
          {wines.map((wine: Wine) => (
            <Grid key={wine.id} item xs={12}>
              <Card wine={wine} />
            </Grid>
          ))}
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
      {isSignedIn && <FloatingAddButton />}
    </div>
  );
};

export async function getServerSideProps() {
  initializeFirebase();
  const db = getFirestore();
  const winesColRef = collection(db, "wines");
  let wines: {}[] = [];

  try {
    const snapshot = await getDocs(winesColRef);
    await snapshot.docs.forEach((doc) => {
      wines.push({ ...doc.data(), id: doc.id });
    });
  } catch (e) {
    console.warn(e);
  }

  // const snapshot = await getDocs(winesColRef);
  // const wines = await snapshot.docs.map((doc) => ({
  //   ...doc.data(),
  //   id: doc.id,
  // }));
  // try an catch

  return {
    props: { wines },
  };
}

export default Home;
