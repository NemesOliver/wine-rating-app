import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Card as MUICard,
  Box,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Rating,
} from "@mui/material";
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
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    // Calculate average rating
    if (wine.rating.length) {
      const averageRating = wine.rating.reduce(
        (a, b) => (a + b) / wine.rating.length
      );

      setRatingValue(averageRating);
    }
  }, [wine]);

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
            <Rating value={ratingValue} readOnly precision={0.5} />
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
