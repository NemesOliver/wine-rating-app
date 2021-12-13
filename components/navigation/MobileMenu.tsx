import Link from "next/link";
import { Toolbar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterListIcon from "@mui/icons-material/FilterList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MobileMenu = () => {
  return (
    <>
      <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link href="/" passHref>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
        </Link>
        <IconButton color="inherit">
          <FavoriteIcon />
        </IconButton>
        <IconButton color="inherit">
          <FilterListIcon />
        </IconButton>
        <Link href="/profile" passHref>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </>
  );
};

export default MobileMenu;
