import { Toolbar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterListIcon from "@mui/icons-material/FilterList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MobileMenu = () => {
  return (
    <>
      <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <IconButton color="inherit">
          <HomeIcon />
        </IconButton>
        <IconButton color="inherit">
          <FavoriteIcon />
        </IconButton>
        <IconButton color="inherit">
          <FilterListIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </>
  );
};

export default MobileMenu;
