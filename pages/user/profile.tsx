import { useContext, useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import initializeFirebase from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import ProfilePage from "../../components/pages/Profile.styled";
import EditDisplayName from "../../components/editUser/EditDisplayName";
import UpdateAvatar from "../../components/editUser/UpdateAvatar";
import {
  Avatar,
  Container,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import withAuth from "../../components/withAuth";

interface UserProfile {
  displayName: string;
  email: string;
  uid: string;
  photoUrl: string;
  favorites: string[];
  wines: string[];
}

const Profile = () => {
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [displayNameModalOpen, setDisplayNameModalOpen] = useState(false);
  const { currentUserId, setUserDocId } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState<UserProfile | any>({});

  useEffect(() => {
    initializeFirebase();
    const getUser = async () => {
      const db = getFirestore();
      const usersColRef = collection(db, "users");
      const snapshot = await getDocs(usersColRef);
      // 1. set up a query to match users
      // 2. error handling
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
  }, [currentUserId, setUserDocId, displayNameModalOpen, setAvatarModalOpen]);

  return (
    <Container>
      <ProfilePage>
        {/* OPENS MODAL */}
        <UpdateAvatar
          avatarModalOpen={avatarModalOpen}
          setAvatarModalOpen={setAvatarModalOpen}
        />
        <Box sx={{ position: "relative" }}>
          <Box
            onClick={() => setAvatarModalOpen(true)}
            sx={{
              cursor: "pointer",
              background: "#030303",
              width: "120px",
              height: "120px",
              position: "absolute",
              mt: "50px",
              mb: "2rem",
              borderRadius: "50%",
              zIndex: 999999,
              opacity: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              ":hover": () => ({ opacity: 0.5 }),
            }}
          >
            <PhotoCamera
              sx={{
                zIndex: 999999999,
                color: "#ffffff",
                width: "35%",
                height: "35%",
              }}
            />
          </Box>
          <Avatar
            src={userProfile.photoUrl}
            sx={{
              mt: "50px",
              mb: "2rem",
              width: "120px",
              height: "120px",
              boxShadow:
                "0px 5px 5px -3px rgb(0 0 0 / 20%) , 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", mb: "4rem" }}>
          {/* OPENS MODAL */}
          <EditDisplayName
            displayNameModalOpen={displayNameModalOpen}
            setDisplayNameModalOpen={setDisplayNameModalOpen}
          />
          <Typography fontWeight="bold" variant="h6" sx={{ ml: "45px" }}>
            {userProfile.displayName
              ? userProfile.displayName
              : userProfile.email}
          </Typography>
          <IconButton
            onClick={() => setDisplayNameModalOpen(true)}
            size="small"
            color="info"
            sx={{ ml: "10px" }}
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Typography sx={{ alignSelf: "flex-start" }} fontWeight={600}>
          Your Collection
        </Typography>
        <Divider flexItem sx={{ mb: "2rem" }} />
        {/* RENDER USER ADDED CONENT HERE */}
      </ProfilePage>
    </Container>
  );
};

export default withAuth(Profile);
