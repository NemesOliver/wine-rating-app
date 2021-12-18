import { useState, useContext, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { doc, setDoc, getFirestore, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../context/AuthContext";
import { SnackbarContext } from "../../context/SnackbarContext";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Input,
  Box,
} from "@mui/material";
import initializeFirebase from "../../firebase";

interface UpdateAvatarProps {
  avatarModalOpen: boolean;
  setAvatarModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const UpdateAvatar = ({
  avatarModalOpen,
  setAvatarModalOpen,
}: UpdateAvatarProps) => {
  const [file, setFile] = useState<FileList | {}>({} as FileList);
  const [preview, setPreview] = useState("");
  const { userDocId, currentUserId } = useContext(AuthContext);
  const { triggerSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    // Clean up memory
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const uploadFileToFirestore = () => {
    initializeFirebase();
    // Firebase storage container ref
    const storage = getStorage();
    const avatarRef = ref(storage, `${currentUserId}/avatar`);

    // Firebase firestore ref
    const db = getFirestore();
    const userColRef = collection(db, "users");

    // 1. Upload file to Firebase
    uploadBytes(avatarRef, file as File)
      .then(() => {
        getDownloadURL(avatarRef)
          .then((url) => {
            // 2. Update user profile picture
            setDoc(
              doc(userColRef, userDocId),
              { photoUrl: url },
              { merge: true }
            )
              .then(() => {
                triggerSnackbar(
                  "success",
                  "Your profile picture has been successfuly updated."
                );
                setAvatarModalOpen(false);
              })
              .catch((e) => {
                console.warn(e);
                triggerSnackbar("error", "Failed to update.");
              });
          })
          .catch((e) => {
            console.warn(e);
            triggerSnackbar("error", "Failed to update.");
          });
      })
      .catch((e) => {
        console.warn(e);
        triggerSnackbar("error", "Failed to update.");
      });
  };

  return (
    <>
      <Dialog open={avatarModalOpen} onClose={() => setAvatarModalOpen(false)}>
        <DialogTitle>Update avatar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            *It might take few seconds for a picture to update.
          </DialogContentText>
          {preview && (
            <Box sx={{ position: "relative", height: "150px", width: "150px" }}>
              <Image
                objectFit="contain"
                src={preview}
                alt="preview"
                layout="fill"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAvatarModalOpen(false)}>Cancel</Button>
          <label htmlFor="file-upload-button">
            <input
              capture="user"
              style={{ display: "none" }}
              id="file-upload-button"
              type="file"
              onChange={(e) => {
                setFile((e.target as HTMLInputElement).files![0]);
                setPreview(
                  URL.createObjectURL((e.target as HTMLInputElement).files![0])
                );
              }}
            />
            <Button component="span">Upload</Button>
          </label>

          <Button onClick={uploadFileToFirestore}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateAvatar;
