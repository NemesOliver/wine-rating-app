import {
  useState,
  useContext,
  SetStateAction,
  useEffect,
  SyntheticEvent,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import initializeFirebase from "../../firebase";
import { doc, setDoc, getFirestore, collection } from "firebase/firestore";
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

// TESTING FILE UPLOAD
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
  const { userDocId } = useContext(AuthContext);
  const { triggerSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    return () => {
      setFile({});
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Everything works as expected

  // const uploadFileToFirestore = () => {
  //   const storage = getStorage();
  //   const avatarRef = ref(storage, `images/avatar.jpg`);

  //   uploadBytes(avatarRef, file)
  //     .then((snapshot) => {
  //       console.log("Success", snapshot);
  //     })
  //     .catch((e) => console.warn(e));
  // };

  return (
    <>
      <Dialog open={avatarModalOpen} onClose={() => setAvatarModalOpen(false)}>
        <DialogTitle>Update avatar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose an avatar from your file system.
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
            <Input
              sx={{ display: "none" }}
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

          <Button>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateAvatar;
