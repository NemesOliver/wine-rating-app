import { useContext, useEffect, useState } from "react";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import initializeFirebase from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { SnackbarContext } from "../../context/SnackbarContext";
import ProfilePage from "../../components/pages/Profile.styled";
import EditDisplayName from "../../components/user/editUser/EditDisplayName";
import UpdateAvatar from "../../components/user/editUser/UpdateAvatar";
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
import Collection from "../../components/user/userCollection/Collection";

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
  const { triggerSnackbar } = useContext(SnackbarContext);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [displayNameModalOpen, setDisplayNameModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | any>({});

  useEffect(() => {
    initializeFirebase();
    const getUser = async () => {
      try {
        const db = getFirestore();
        const usersColRef = collection(db, "users");
        const queryUser = query(usersColRef, where("uid", "==", currentUserId));
        const snapshot = await getDocs(queryUser);

        let user: any = {};
        snapshot.docs.forEach((doc) => {
          user = {
            ...doc.data(),
            id: doc.id,
          };
        });

        setUserProfile(user);
        setUserDocId(user.id);
      } catch (e) {
        triggerSnackbar("error", "Failed to fetch user.");
      }
    };
    getUser();
  }, [currentUserId, setUserDocId, displayNameModalOpen, triggerSnackbar]);

  return (
    <div>
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
                transition: "0.3s all ease-in",

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
          <Collection />
        </ProfilePage>
      </Container>
    </div>
  );
};

export default withAuth(Profile);
