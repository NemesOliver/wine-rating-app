import React, { useContext, useEffect, useState } from "react";
import Card from "../../card/Card";
import { Grid } from "@mui/material";
import initializeFirebase from "../../../firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";

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

// component name is with lower case to prevent vercel build error
const Collection = () => {
  const { currentUserId } = useContext(AuthContext);
  const [wines, setWines] = useState([]);

  useEffect(() => {
    initializeFirebase();

    const getUserWines = async () => {
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
    };

    getUserWines();
  }, [currentUserId]);

  return (
    <div>
      {/* RENDER LOAD ING OR NO WINES IF arr.length < 0 */}
      <Grid container spacing={5}>
        {wines.map((wine: Wine) => (
          <Grid key={wine.id} item xs={12}>
            <Card wine={wine} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Collection;
