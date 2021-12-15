import { useContext, useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import initializeFirebase from "../firebase";
import { AuthContext } from "../context/AuthContext";

import withAuth from "../components/withAuth";

const Profile = () => {
  const { currentUserId } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});

  console.log(userProfile, currentUserId);

  useEffect(() => {
    initializeFirebase();
    const getUser = async () => {
      const db = getFirestore();
      const usersColRef = collection(db, "users");
      const snapshot = await getDocs(usersColRef);
      let userFound = {};
      await snapshot.docs.forEach((doc) => {
        if (doc.data().uid === currentUserId) {
          userFound = { ...doc.data() };
        }
      });
      setUserProfile(userFound);
    };
    getUser();
  }, [currentUserId]);

  return <div>User Profile</div>;
};

export default withAuth(Profile);
