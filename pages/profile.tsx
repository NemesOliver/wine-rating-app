import { useContext, useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import initializeFirebase from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

import withAuth from "../components/withAuth";

const Profile = () => {
  const router = useRouter();
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    initializeFirebase();
    const getUser = async () => {
      const db = getFirestore();
      const usersColRef = collection(db, "users");
      const snapshot = await getDocs(usersColRef);
      let userFound = {};
      await snapshot.docs.forEach((doc) => {
        if (doc.data().uid === currentUser) {
          userFound = { ...doc.data() };
        }
      });
      setUserProfile(userFound);
    };
    getUser();
  }, [currentUser]);

  return <div>User Profile</div>;
};

export default withAuth(Profile);
