import React, { useContext, useEffect, useState } from "react";
import Card from "../../card/Card";
import { Grid, Box, Typography } from "@mui/material";
import initializeFirebase from "../../../firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import Link from "next/link";

interface Wine {
  name: string;
  price: string;
  rating: number[];
  region: string;
  type: string;
  id: string;
  photoUrl: string;
  addedBy: string;
}

const Collection = () => {
  const { currentUserId } = useContext(AuthContext);
  const [wines, setWines] = useState([]);

  useEffect(() => {
    initializeFirebase();

    const getUserWines = async () => {
      try {
        const db = getFirestore();
        const userWineColRef = collection(db, "wines");
        const wineQuery = query(
          userWineColRef,
          where("addedBy", "==", currentUserId)
        );

        const snapshot = await getDocs(wineQuery);
        const usersCollection = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // check back on this
        setWines(usersCollection as any);
      } catch (e) {
        console.warn(e);
      }
    };

    getUserWines();
  }, [currentUserId]);

  return (
    <Box>
      {wines.length ? (
        <Grid sx={{ mb: "4.5rem" }} container spacing={5}>
          {wines.map((wine: Wine) => (
            <Grid key={wine.id} item xs={12}>
              <Card wine={wine} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>
          There is noting in your collection, start building tour collection
          <Link href={"/"}>now</Link>.
        </Typography>
      )}
    </Box>
  );
};

export default Collection;
