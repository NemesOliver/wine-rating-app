import React, { FunctionComponent } from "react";
import {
  Card as MUICard,
  Box,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface CardProps {
  wine: {
    name: string;
    price: string;
    rating: number[];
    region: string;
    type: string;
    photoUrl: string;
    id: string;
  };
}

const Card: FunctionComponent<CardProps> = ({ wine }) => {
  const rating = () => {
    console.log(wine.rating);
    if (wine.rating.length) {
      const averageRating = wine.rating
        .reduce((a, b) => (a + b) / wine.rating.length)
        .toFixed();

      const stars = Array(parseInt(averageRating))
        .fill("star")
        .map((star, index) => <StarIcon key={index} color="warning" />);
        // render additional empty stars for missing rating up to 5

      return stars;
    }
  };
  rating();

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
        src={wine.photoUrl}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {wine.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", pb: 1 }}>
            {/* Rating need to be adjusted render star per 1 and half star if between ~ 0.3 and 0.7 */}
            {/* <StarIcon color="warning" />
            <StarIcon color="warning" />
            <StarIcon color="warning" />
            <StarHalfIcon color="warning" />
            <StarOutlineIcon color="warning" /> */}
            {rating()}

            <Typography sx={{ mt: 0.3 }} variant="subtitle2">
              {`(${wine.rating.length})`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", pb: 1 }}>
            <Typography variant="caption">{`£${wine.price}`}</Typography>
            <FiberManualRecordIcon
              sx={{ width: 7, ml: "5px", mr: "5px", mb: "2px" }}
            />
            <Typography variant="caption">{wine.type.toUpperCase()}</Typography>
            <FiberManualRecordIcon
              sx={{ width: 7, ml: "5px", mr: "5px", mb: "2px" }}
            />
            <Typography variant="caption">
              {wine.region.toUpperCase()}
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <Button sx={{ position: "absolute", bottom: 3, right: 10 }}>MORE</Button>
    </MUICard>
  );
};

export default Card;
