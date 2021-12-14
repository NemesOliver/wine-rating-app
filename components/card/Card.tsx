import React from "react";
import {
  Card as MUICard,
  Box,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  CardActionArea,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Card = () => {
  return (
    <MUICard
      raised
      sx={{
        display: "flex",
        borderRadius: "15px",
        maxWidth: "450px",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        sx={{ maxWidth: 100 }}
        image="/wine_placeholder.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Bourdaux
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", pb: 1 }}>
            <StarIcon color="warning" />
            <StarIcon color="warning" />
            <StarIcon color="warning" />
            <StarHalfIcon color="warning" />
            <StarOutlineIcon color="warning" />
            <Typography sx={{ mt: 0.3 }} variant="subtitle2">
              (47)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", pb: 1 }}>
            <Typography variant="caption">£7.99</Typography>
            <FiberManualRecordIcon
              sx={{ width: 7, ml: "5px", mr: "5px", mb: "2px" }}
            />
            <Typography variant="caption">RED</Typography>
            <FiberManualRecordIcon
              sx={{ width: 7, ml: "5px", mr: "5px", mb: "2px" }}
            />
            <Typography variant="caption">FRANCE</Typography>
          </Box>
        </CardContent>
      </Box>
      <Button sx={{ position: "absolute", bottom: 3, right: 10 }}>MORE</Button>
    </MUICard>
  );
};

export default Card;
