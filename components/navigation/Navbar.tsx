import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Navbar = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar
        color="primary"
        position="fixed"
        sx={{
          top: "auto",
          bottom: matchesSM ? 0 : "",
        }}
      >
        {matchesSM ? <MobileMenu /> : <DesktopMenu />}
      </AppBar>
    </>
  );
};

export default Navbar;
