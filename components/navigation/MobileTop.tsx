import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton, Button } from "@mui/material";
import { MobileTopNavigation } from "./MobileTop.styled";

const MobileTop = () => {
  const router = useRouter();
  const { isSignedIn } = useContext(AuthContext);

  const onClickSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => console.log("user signed out"))
      .catch((e) => console.log(e));
  };

  return (
    <MobileTopNavigation>
      <IconButton edge="start" onClick={() => router.back()}>
        <ArrowBackIosNewIcon />
      </IconButton>
      {isSignedIn ? (
        <Button onClick={onClickSignOut} color="primary">
          Log Out
        </Button>
      ) : (
        <Link href="/login" passHref>
          <Button color="primary">Log in</Button>
        </Link>
      )}
    </MobileTopNavigation>
  );
};

export default MobileTop;
