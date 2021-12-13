import React from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { Fab, Box, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const FloatingAddButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={
        isMobile
          ? { position: "fixed", bottom: 75, right: 15 }
          : { position: "fixed", bottom: 50, right: 50 }
      }
    >
      <Link href="/add" passHref>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  );
};

export default FloatingAddButton;
