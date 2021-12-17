import { useContext, useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import initializeFirebase from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import ProfilePage from "../../components/pages/Profile.styled";
import {
  Avatar,
  Container,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import withAuth from "../../components/withAuth";

// TESTING FILE UPLOAD
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";

interface UserProfile {
  displayName: string;
  email: string;
  uid: string;
  photoUrl: string;
  favorites: string[];
  wines: string[];
}

const Profile = () => {
  const { currentUserId, setUserDocId } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState<UserProfile | any>({});

  console.log(userProfile);

  // Everything works as expected

  // const [file, setFile] = useState<File | null>(null);

  // console.log(file);

  // const uploadFileToFirestore = () => {
  //   const storage = getStorage();
  //   const avatarRef = ref(storage, `images/avatar.jpg`);

  //   uploadBytes(avatarRef, file)
  //     .then((snapshot) => {
  //       console.log("Success", snapshot);
  //     })
  //     .catch((e) => console.warn(e));
  // };

  useEffect(() => {
    initializeFirebase();
    const getUser = async () => {
      const db = getFirestore();
      const usersColRef = collection(db, "users");
      const snapshot = await getDocs(usersColRef);
      // set up a query to match users
      let userFound: any = {};
      await snapshot.docs.forEach((doc) => {
        if (doc.data().uid === currentUserId) {
          userFound = { ...doc.data(), id: doc.id };
        }
      });
      setUserProfile(userFound);
      setUserDocId(userFound.id);
    };
    getUser();
  }, [currentUserId, setUserDocId]);

  return (
    <ProfilePage>
      <Container>
        <Avatar
          src={userProfile.photoUrl}
          sx={{
            width: "120px",
            height: "120px",
            boxShadow:
              "0px 5px 5px -3px rgb(0 0 0 / 20%) , 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
          }}
        />
        <Box sx={{ display: "flex" }}>
          <Typography fontWeight="bold" variant="h6">
            {userProfile.displayName
              ? userProfile.displayName
              : userProfile.email}
          </Typography>
          <Link href="/user/editUser" passHref>
            <IconButton size="small" color="info" sx={{ ml: "10px" }}>
              <EditIcon />
            </IconButton>
          </Link>
        </Box>
        <Divider />
        <Typography fontWeight={600}>Your Collection</Typography>
      </Container>
    </ProfilePage>
  );
};

export default withAuth(Profile);
