import { Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterListIcon from "@mui/icons-material/FilterList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DesktopMenu = () => {
  return (
    <>
      <Toolbar sx={{ flexGrow: 1 }}>
        <IconButton
          color="inherit"
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Home</Typography>
      </Toolbar>
    </>
  );
};

export default DesktopMenu;
